import Group from "../models/group.js";
import User from "../models/user.js";
import Outgoing from '../models/outgoing.js';
import jwt from "jsonwebtoken";

async function isInGroup(user, group, token) {
    const gruppi = await fetch('http://localhost:3001/api/v1/groups/' + group + '/', {
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
    const user = await fetch('http://localhost:3001/api/v1/users/' + userid + '/', {
        method: 'GET',
        headers: {
            'x-auth-token': token,
        },
    });
    if (user.status == 200)
        return true;
    return false;
}

async function getGroup(groupid, token) {
    const group = await fetch('http://localhost:3001/api/v1/groups/' + groupid + '/', {
        method: 'GET',
        headers: {
            'x-auth-token': token,
        },
    });
    if (group.status == 200)
        return true;
    return false;
}

function buyerInUsers(buyer, users) {
    for (let i = 0; i < users.length; i++) {
        if (users[i].user == buyer)
            return true;
    }
    return false;
}

function uniqueUsers(users) {
    for (let i = 0; i < users.length; i++) {
        for (let j = i + 1; j < users.length; j++) {
            if (users[i].user == users[j].user)
                return false;
        }
    }
    return true;
}

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


        if (! await getGroup(group, token))
            return res.status(404).json({ message: "Group not found" });


        if (! await getUser(paidBy, token))
            return res.status(404).json({ message: "User not found" });

        for (let i = 0; i < users.length; i++) {
            if (! await getUser(users[i].user, token))
                return res.status(404).json({ message: "User not found" });
        }

        //check if users is in group
        if (! await isInGroup(paidBy, group, token))
            return res.status(404).json({ message: "User not in group" });

        for (let i = 0; i < users.length; i++) {
            if (! await isInGroup(users[i].user, group, token))
                return res.status(404).json({ message: "User not in group" });
        }

        //check if paidBy is in users
        if (buyerInUsers(paidBy, users))
            return res.status(400).json({ message: "Buyer in users" });

        //check if users are unique
        if (!uniqueUsers(users))
            return res.status(400).json({ message: "Users are not unique" });



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

export const updateOutgoing = async (req, res) => {
    const { id } = req.params;
    const {
        name,
        description,
        value,
        paidBy,
        users,
        group,
        periodicity,
        tag,
        isPaid,
    } = req.body;

    let token = req.header("x-auth-token");
    if (token.startsWith("Bearer ")) {
        token = token.slice(7, token.length).trimLeft();
    }

    //check if group exists
    if (! await getGroup(group, token))
        return res.status(404).json({ message: "Group not found" });

    try {
        const outgoing = await Outgoing.findById(id);
        if (name !== undefined)
            outgoing.name = name;
        if (description !== undefined)
            outgoing.description = description;
        if (value !== undefined) {
            //check if value is a number and non negative
            if (isNaN(value))
                return res.status(400).json({ message: "Value must be a number" });
            if (value < 0)
                return res.status(400).json({ message: "Value cannot be negative" });
            // check if value is greater than users value
            if (users !== undefined) {
                let total;
                for (let i = 0; i < users.length; i++) {
                    total = total + users[i].value;
                    if (value < users[i].value)
                        return res.status(400).json({ message: "Value cannot less than users value" });
                }
                if (value < total)
                    return res.status(400).json({ message: "Value cannot less than users value" });
            } else {
                let total;
                for (let i = 0; i < outgoing.users.length; i++) {
                    total = total + outgoing.users[i].value;
                    if (value < outgoing.users[i].value)
                        return res.status(400).json({ message: "Value cannot less than users value" });
                }
                if (value < total)
                    return res.status(400).json({ message: "Value cannot less than users value" });
            }
            outgoing.value = value;
        }
        if (paidBy !== undefined) {
            //check if paidBy exists
            if (! await getUser(paidBy, token))
                return res.status(404).json({ message: "User not found" });
            //check if users is in group
            if (! await isInGroup(paidBy, group, token))
                return res.status(404).json({ message: "User not in group" });
            outgoing.paidBy = paidBy;
        }
        if (users !== undefined) {
            //check if users exists
            for (let i = 0; i < users.length; i++) {
                if (! await getUser(users[i].user, token))
                    return res.status(404).json({ message: "User not found" });
            }

            for (let i = 0; i < users.length; i++) {
                if (! await isInGroup(users[i].user, group, token))
                    return res.status(404).json({ message: "User not in group" });
            }
            //check if users are unique
            if (!uniqueUsers(users))
                return res.status(400).json({ message: "Users are not unique" });
            for (let i = 0; i < users.length; i++) {
                if (isNaN(users[i].value))
                    return res.status(400).json({ message: "Value must be a number" });
                if (users[i].value < 0)
                    return res.status(400).json({ message: "Value cannot be negative" });
            }
            outgoing.users = users;
        }
        if (periodicity !== undefined) {
            //check if periodicity is a number
            if (periodicity.isPeriodic) {
                if (isNaN(periodicity.period))
                    return res.status(400).json({ message: "Periodicity must be a number" });
                if (periodicity.period <= 0)
                    return res.status(400).json({ message: "Periodicity must be positive" });
            }
            outgoing.periodicity = periodicity;
        }
        if (tag !== undefined)
            outgoing.tag = tag;
        if (isPaid !== undefined) {
            //check if isPaid is a boolean
            if (typeof isPaid !== "boolean")
                return res.status(400).json({ message: "isPaid must be a boolean" });
            outgoing.isPaid = isPaid;
        }
        const savedOutgoing = await outgoing.save();
        res.status(200).json(savedOutgoing);
    } catch (error) {
        return res.status(404).json({ message: "Outgoing not found" });
    }
};