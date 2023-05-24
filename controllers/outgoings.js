import Group from "../models/group.js";
import User from "../models/user.js";
import Outgoing from '../models/outgoing.js';
import jwt from "jsonwebtoken";

async function isInGroup(user, group, token) {
    const gruppi = await fetch('http://localhost:3001/api/v1/users/' + user + '/groups', {
        method: 'GET',
        headers: {
            'x-auth-token': token,
        },
    });
    const gruppiJson = await gruppi.json();
    for (let i = 0; i < gruppiJson.length; i++) {
        if (gruppiJson[i]._id == group)
        return true;
    }
    return false;
}

// todo controllo utenti duplicati, aggiungere spesa a gruppo e utente
// ? COME AGGIORNO UTENTI
export const createOutgoing = async (req, res) => {
    try {
        const {
            name,
            description,
            value,
            paidBy,
            users,
            group,
            periodicity,
            tag,
        } = req.body;

        let token = req.header("x-auth-token");     

        if (!name || !value || !paidBy || !users || !group || !periodicity)
            return res.status(400).json({ message: "Missing required fields" });

        if (! await Group.findById(group))
            return res.status(400).json({ message: "Group not found" });

        if (! await User.findById(paidBy))
            return res.status(400).json({ message: "User not found" });

        for (let i = 0; i < users.length; i++) {
            if (! await User.findById(users[i].user))
                return res.status(400).json({ message: "User not found" });
        }

        if (value < 0)
            return res.status(400).json({ message: "Value cannot be negative" });

        if (! await isInGroup(paidBy, group, token))
            return res.status(400).json({ message: "User not in group" });
        
        for (let i = 0; i < users.length; i++) {
            if (! await isInGroup(users[i].user, group, token))
                return res.status(400).json({ message: "User not in group" });
        }

        await fetch('http://localhost:3001/api/v1/users/' + paidBy, {
            method: 'PUT',
            headers: {
                'x-auth-token': token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({}),
        })




        const newOutgoing = new Outgoing({
            name,
            description,
            value,
            paidBy,
            users,
            group,
            periodicity,
            tag,
        });
        const savedOutgoing = await newOutgoing.save();
        res.status(201).json(savedOutgoing);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};