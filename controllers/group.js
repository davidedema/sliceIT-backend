import Group from "../models/group.js";
import User from "../models/user.js";

/*FUNZIONE CHE GENERA UN LINK D'INVITO UNIVOCO*/
function generateInviteLink() {
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let inviteLink = "";
  for (let i = 0; i < 20; i++) {
    inviteLink += characters[Math.floor(Math.random() * characters.length)];
  }
  return inviteLink;
}

/*CREARE UN GRUPPO*/
export const createGroup = async (req, res) => {
  try {
    const { name, descriprion, groupPicture } = req.body;
    const inviteLink = generateInviteLink();

    const group = new Group({ name, descriprion, groupPicture, inviteLink });

    // Aggiungi l'utente creatore come membro del gruppo
    const userId = req.user._id;
    group.members.push(userId);

    await group.save();

    // Aggiungi il gruppo all'utente corrente
    const user = await User.findById(userId);
    user.groups.push(group._id);
    await user.save();

    res.status(201).json({ group });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: error.message });
  }
};

/*UNIRSI AD UN GRUPPO TRAMITE LINK INVITO*/
export const joinGroup = async (req, res) => {
  try {
    const { inviteLink } = req.query;
    const user = JSON.parse(req.body.user);

    const group = await Group.findOne({ inviteLink });
    if (!group) {
      res.status(404).send("Group not found");
      return;
    }
    if (group.members.includes(user._id)) {
      res.status(400).send("User already a member of the group");
      return;
    }
    group.members.push(user._id);
    await group.save();

    // Aggiungi il gruppo all'utente corrente
    const userId = req.user._id;
    const currentUser = await User.findById(userId);
    currentUser.groups.push(group._id);
    await currentUser.save();

    res.json({ group });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

/*AGGIORNARE UN GRUPPO*/
export const updateGroup = async (req, res) => {
  try {
    const { groupId } = req.params;
    const { name, description, groupPicture } = req.body;

    const group = await Group.findByIdAndUpdate(
      groupId,
      { name, description, groupPicture },
      { new: true }
    );
    if (!group) {
      res.status(404).send("Group not found");
      return;
    }

    res.json({ group });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

/*LASCIARE UN GRUPPO*/
export const leaveGroup = async (req, res) => {
  try {
    const { groupId } = req.params;

    const group = await Group.findById(groupId);
    if (!group) {
      res.status(404).send("Group not found");
      return;
    }

    const userId = req.user._id;
    if (!group.members.includes(userId)) {
      res.status(400).send("User is not a member of the group");
      return;
    }

    // Rimuovi l'utente dal gruppo
    const index = group.members.indexOf(userId);
    if (index > -1) {
      group.members.splice(index, 1);
    }

    // Rimuovi il gruppo dall'utente
    const currentUser = await User.findById(userId);
    currentUser.groups.pull(groupId);
    await currentUser.save();

    // Se il gruppo è senza membri, elimina il gruppo dal database
    if (group.members.length === 0) {
      await Group.findByIdAndDelete(groupId);
      res.json({ message: "Group deleted" });
    } else {
      // Altrimenti, salva le modifiche al gruppo
      await group.save();
      res.json({ group });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

/*RESTITUIRE I GRUPPI DI UN UTENTE*/
export const getUserGroups = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId).populate("groups");
    if (!user) {
      res.status(404).send("User not found");
      return;
    }

    const groups = user.groups;

    res.json({ groups });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

/*AGGIUNGERE UNA SPESA AD UN GRUPPO*/
export const addOutgoing = async (req, res) => {
  try {
    const { name, value, paidBy, components, groupId } = req.body;

    // Verifica che il gruppo esista
    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    // Verifica che l'utente che paga sia membro del gruppo
    if (!group.members.includes(paidBy)) {
      return res
        .status(400)
        .json({ message: "PaidBy user is not a member of the group" });
    }

    // Crea la nuova spesa
    const outgoing = new Outgoing({
      name,
      value,
      paidBy,
      components,
      group: groupId,
    });

    // Salva la spesa nel gruppo
    group.outgoings.push(outgoing._id);
    await group.save();

    // Salva la spesa nel database
    await outgoing.save();

    // Aggiorna gli outgoings dell'utente che paga la spesa
    const user = await User.findById(paidBy);
    user.outgoings.push(outgoing._id);
    await user.save();

    res.status(201).json({ outgoing });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
  /*manca la divisione della spesa e l'aggiunta della spesa nei membri*/
};
