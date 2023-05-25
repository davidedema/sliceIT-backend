import Group from "../models/group.js";
import User from "../models/user.js";
import Outgoing from '../models/outgoing.js';
import jwt from "jsonwebtoken";

async function isInGroup(user, group, token) {
    const gruppi = await fetch('http://localhost:3001/api/v1/groups/' + group +'/', {
        method: 'GET',
        headers: {
            'x-auth-token': token,
        },
    });
    const gruppoJson = await gruppi.json();
    if (gruppoJson.members.includes(user))
        return true;
    return false;
}

async function getUser(userid, token) {
    const user = await fetch('http://localhost:3001/api/v1/users/' + userid +'/', {
        method: 'GET',
        headers: {
            'x-auth-token': token,
        },
    });
    if (user.status == 200)
        return true;
    return false;
}

// todo controllo utenti duplicati, aggiungere spesa a gruppo e utente

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
        
        //check if value is a number
        if (isNaN(value))
            return res.status(400).json({ message: "Value must be a number" });
        if (value < 0)
            return res.status(400).json({ message: "Value cannot be negative" });
        for (let i = 0; i < users.length; i++) {
            if (isNaN(users[i].value))
                return res.status(400).json({ message: "Value must be a number" });
            if (users[i].value < 0)
                return res.status(400).json({ message: "Value cannot be negative" });
        }

        //check if periodicity is a number
        if (periodicity.isPeriodic) {
            if (isNaN(periodicity.period))
                return res.status(400).json({ message: "Periodicity must be a number" });
            if (periodicity.period <= 0)
                return res.status(400).json({ message: "Periodicity must be positive" });
        }

        if (! await Group.findById(group))
            return res.status(400).json({ message: "Group not found" });

        if (! await getUser(paidBy, token))
            return res.status(400).json({ message: "User not found" });

        for (let i = 0; i < users.length; i++) {
            if (! await getUser(users[i].user, token))
                return res.status(400).json({ message: "User not found" });
        }

        //check if users is in group
        if (! await isInGroup(paidBy, group, token))
            return res.status(400).json({ message: "User not in group" }); 

        for (let i = 0; i < users.length; i++) {
            if (! await isInGroup(users[i].user, group, token))
                return res.status(400).json({ message: "User not in group" });
        }


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

        // aggiorno utente e gruppo
        // ? non posso fare cosi vero
        
        const gruppo = await Group.findById(group);
        gruppo.outgoings.push(savedOutgoing._id);
        gruppo.save();

        const utente = await User.findById(paidBy);
        utente.outgoings.push(savedOutgoing._id);
        utente.save();
        for (let i = 0; i < users.length; i++) {
            let utente = await User.findById(users[i].user);
            utente.outgoings.push(savedOutgoing._id);
            utente.save();
        }
        res.status(201).json(savedOutgoing);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};