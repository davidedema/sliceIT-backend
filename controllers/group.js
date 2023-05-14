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
    group.members.pull(userId);
    await group.save();

    // Rimuovi il gruppo dall'utente
    const currentUser = await User.findById(userId);
    currentUser.groups.pull(groupId);
    await currentUser.save();

    //manca l'eliminazione in caso non abbia più membri

    res.json({ group });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};
