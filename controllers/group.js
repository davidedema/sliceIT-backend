import Group from "../models/group.js";
import User from "../models/user.js";
import Outgoing from "../models/outgoing.js";
import jwt from "jsonwebtoken";

/*FUNZIONE CHE RESTITUISCE GLI UTENTI DI UN GRUPPO*/
/*async function getGroupUsers(groupId) {
    try {
        const response = await fetch(
            "http://localhost:3000/api/v1/groups/" + groupId + "/users",
            {
                method: "GET",
                headers: {
                    "x-auth-token": userStore.token,
                },
            }
        );
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            // Handle error response from the serv
            const errorData = await response.json();
            console.error("response failed:", errorData.message);
        }
    } catch (error) {
        console.error("error:", error);
    }
}*/

/*FUNZIONE CHE RESTITUISCE LE SPESE DI UN GRUPPO*/
async function fetchGroupOutgoings(groupId, token) {
    try {
        const response = await fetch(
            "http://localhost:3000/api/v1/groups/" + groupId + "/outgoings",
            {
                method: "GET",
                headers: {
                    "x-auth-token": token,
                },
            }
        );
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            // Handle error response from the server
            const errorData = await response.json();
            console.error("response failed:", errorData.message);
        }
    } catch (error) {
        console.error("error:", error);
    }
}

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

/*RESTITUIRE UN GRUPPO*/
export const getGroup = async (req, res) => {
    try {
        const { groupId } = req.params;
        try {
            // Trova il gruppo nel database con l'ID specificato
            const group = await Group.findById(groupId);

            // Verifica se l'utente che fa la richiesta è membro del gruppo
            let token = req.header("x-auth-token");
            if (token.startsWith("Bearer ")) {
                token = token.slice(7, token.length);
            }
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const userId = decoded.id;
            if (!group.members.includes(userId)) {
                return res
                    .status(403)
                    .json({ message: "L'utente non è membro del gruppo." });
            }
            res.status(200).json(group);
        } catch (error) {
            res.status(404).send("Group not found");
            return;
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
};

/*RESTITUIRE GLI UTENTI DI UN GRUPPO*/
export const getGroupUsers = async (req, res) => {
    try {
        const { groupId } = req.params;
        try {
            // Trova il gruppo nel database con l'ID specificato
            const group = await Group.findById(groupId);

            // Verifica se l'utente che fa la richiesta è membro del gruppo
            let token = req.header("x-auth-token");
            if (token.startsWith("Bearer ")) {
                token = token.slice(7, token.length);
            }
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const userId = decoded.id;
            if (!group.members.includes(userId)) {
                return res
                    .status(403)
                    .json({ message: "L'utente non è membro del gruppo." });
            }
            // Restituisci gli utenti del gruppo come risposta
            const user = await User.find({ _id: { $in: group.members } });
            res.status(200).json(user);
        } catch (error) {
            res.status(404).send("Group not found");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
};

/*RESTITUIRE LE SPESE DI UN GRUPPO*/
export const getGroupOutgoings = async (req, res) => {
    try {
        const { groupId } = req.params;
        try {
            // Trova il gruppo nel database con l'ID specificato
            const group = await Group.findById(groupId);

            // Verifica se l'utente che fa la richiesta è membro del gruppo
            let token = req.header("x-auth-token");
            if (token.startsWith("Bearer ")) {
                token = token.slice(7, token.length);
            }
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const userId = decoded.id;
            if (!group.members.includes(userId)) {
                return res
                    .status(403)
                    .json({ message: "L'utente non è membro del gruppo." });
            }

            //restituisci le spese del gruppo come risposta
            const outgoings = await Outgoing.find({
                _id: { $in: group.outgoings },
            });
            res.status(200).json(outgoings);
        } catch (error) {
            res.status(404).send("Group not found");
            return;
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
};

/*RESTITUIRE IL BILANCIO DI UN GRUPPO*/
export const getGroupBalance = async (req, res) => {
    try {
        const { groupId } = req.params;
        try {
            let token = req.header("x-auth-token");

            // Fetch delle spese del gruppo
            const groupOutgoings = await fetchGroupOutgoings(groupId,token);

            // Trova il gruppo nel database con l'ID specificato
            const group = await Group.findById(groupId);

            // Verifica se l'utente che fa la richiesta è membro del gruppo
            if (token.startsWith("Bearer ")) {
                token = token.slice(7, token.length);
            }
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const userId = decoded.id;
            if (!group.members.includes(userId)) {
                return res
                    .status(403)
                    .json({ message: "L'utente non è membro del gruppo." });
            }

            // Calcola il bilancio del gruppo
            const balance = {};

            // Itera sulle spese del gruppo
            for (const spesa of groupOutgoings) {
                // Ignora le spese contrassegnate come pagate
                if (spesa.isPaid) continue;

                if (userId == spesa.paidBy) {
                    // L'utente corrente ha pagato la spesa
                    for (const membro of spesa.users) {
                        const otherUserId = membro.user;
                        const value = membro.value;

                        // Aggiungi l'importo alla bilancia tra l'utente corrente e l'altro utente
                        if (balance[otherUserId]) {
                            balance[otherUserId] += value;
                        } else {
                            balance[otherUserId] = value;
                        }
                    }
                } else {
                    // L'utente corrente è stato pagato per la spesa
                    for (const membro of spesa.users) {
                    if (userId == membro.user) {
                            const otherUserId = spesa.paidBy;
                            const value = membro.value;

                            // Sottrai l'importo dalla bilancia tra l'utente corrente e l'altro utente
                            if (balance[otherUserId]) {
                                balance[otherUserId] -= value;
                            } else {
                                balance[otherUserId] = -value;
                            }
                        }
                    }
                }
            }
            // Restituisci il bilancio del gruppo come risposta
            res.status(200).json({ balance });
        } catch (error) {
            res.status(404).send("Group not found");
            return;
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: error.message });
    }
};

/*CREARE UN GRUPPO*/
export const createGroup = async (req, res) => {
    try {
        const { name, description, groupPicture } = req.body;
        const inviteLink = generateInviteLink();

        const group = new Group({
            name,
            description,
            groupPicture,
            inviteLink,
        });
        await group.save();

        // Aggiungi il gruppo all'utente corrente
        let token = req.header("x-auth-token");
        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length);
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;
        const user = await User.findById(userId);
        user.groups.push(group._id);
        await user.save();

        // Aggiungi l'utente corrente al gruppo
        group.members.push(user._id);
        await group.save();

        res.status(201).json({ group });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: error.message });
    }
};

/*UNIRSI AD UN GRUPPO TRAMITE LINK INVITO*/
export const joinGroup = async (req, res) => {
    try {
        const { inviteLink } = req.body;
        console.log(inviteLink);

        const group = await Group.findOne({ inviteLink });
        if (!group) {
            res.status(404).send("Group not found");
            return;
        }

        let token = req.header("x-auth-token");
        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length);
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        if (group.members.includes(userId)) {
            res.status(400).send("User already a member of the group");
            return;
        }

        // Aggiungi il gruppo all'utente corrente
        const currentUser = await User.findById(userId);
        currentUser.groups.push(group._id);
        await currentUser.save();

        // Aggiungi l'utente corrente al gruppo
        group.members.push(userId);
        await group.save();

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

        // id utente
        let token = req.header("x-auth-token");
        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length);
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        const user = await User.findById(userId);
        if (!user.groups.includes(groupId)) {
            res.status(401).send("User is not a member of the group");
            return;
        }

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

        // id utente
        let token = req.header("x-auth-token");
        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length);
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;
        if (!group.members.includes(userId)) {
            res.status(400).send("User is not a member of the group");
            return;
        }

        // Rimuovi il gruppo dall'utente
        const currentUser = await User.findById(userId);
        currentUser.groups.pull(groupId);
        await currentUser.save();

        // Rimuovi l'utente dal gruppo
        group.members.pull(userId);

        /*// Verifica se il gruppo è rimasto senza utenti
    if (group.members.length === 0) {
      // Trova tutte le spese associate al gruppo
      const expenses = await Expense.find({ group: groupId });

      // Rimuovi il riferimento al gruppo da tutte le spese
      for (const expense of expenses) {
        expense.group = null;
        await expense.save();
      }

      // Elimina il gruppo
      await Group.findByIdAndDelete(groupId);
    }*/ //attenzione che diventa una delete e non più una put

        await group.save();
        res.json({ group });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
};
