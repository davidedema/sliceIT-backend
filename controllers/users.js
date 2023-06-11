import User from '../models/user.js';
import Group from '../models/group.js';
import Outgoing from '../models/outgoing.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        try {
            // se id non esistente
            if (!id) return res.status(400).json({ message: "Missing required fields" });
            // cerco user con id
            const user = await User.findById(id);
            user.password = undefined;
            res.status(200).json(user);
        } catch (error) {
            return res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getUserGroups = async (req, res) => {
    try {
        const { id } = req.params;
        let token = req.header("x-auth-token");
        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trimLeft();
        }
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        // se chi ha fatto la richiesta non corrisponde all'utente cercato
        console.log(verified)
        console.log(verified.id, id)
        if (verified.id !== id)
            return res.status(401).json({ message: 'Not authorized' });
        const groups = await Group.find({ _id: { $in: user.groups } });
        if (!groups)
            return res.status(404).json({ message: 'Groups not found' });
        res.status(200).json(groups);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getUserOutgoings = async (req, res) => {
    try {
        const { id } = req.params;
        let token = req.header("x-auth-token");
        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trimLeft();
        }
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(id);
        if (!user)
            return res.status(404).json({ message: 'User not found' });
        // se chi ha fatto la richiesta non corrisponde all'utente cercato
        if (verified.id !== id)
            return res.status(401).json({ message: 'Not authorized' });
        const outgoings = await Outgoing.find({ _id: { $in: user.outgoings } });
        if (!outgoings)
            return res.status(404).json({ message: 'Outgoings not found' });
        res.status(200).json(outgoings);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            email,
            nickname,
            password,
            firstName,
            lastName,
        } = req.body;
        let token = req.header("x-auth-token");
        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trimLeft();
        }
        // se chi ha fatto la richiesta non corrisponde all'utente cercato
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if (verified.id !== id)
            return res.status(401).json({ message: 'Not authorized' });
        const user = await User.findById(id);
        if (!user)
            return res.status(404).json({ message: 'User not found' });

        if (await User.findOne({ email: email }) && email !== user.email)
            return res.status(400).json({ message: 'Email already exists' });

        if (await User.findOne({ nickname: nickname }) && nickname !== user.nickname)
            return res.status(400).json({ message: 'Nickname already exists' });

        if (email !== undefined)
            user.email = email;
        if (nickname !== undefined)
            user.nickname = nickname;
        if (password !== undefined) {
            const salt = await bcrypt.genSalt();
            const passwordHash = await bcrypt.hash(password, salt);
            user.password = passwordHash;
        }
        if (firstName !== undefined)
            user.firstName = firstName;
        if (lastName !== undefined)
            user.lastName = lastName;

        try {
            await user.save();
        } catch (error) {
            res.status(409).json({ message: error.message });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        let token = req.header("x-auth-token");
        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trimLeft();
        }
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if (verified.id !== id)
            return res.status(401).json({ message: 'Not authorized' });
        try {
            const user = await User.findByIdAndDelete(id);
        } catch (error) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//BILANCIO
//Creditori
function getCreditors(outgoings, id){
    const creditors = {
        creditors: [],
        total: 0
    };

    for(let i = 0; i < outgoings.length; i++){
        if(!outgoings[i].paidBy.equals(id) && !outgoings[i].isPaid){
            let user = outgoings[i].users.find(u => u.user.equals(id));
            if(!user){
                continue;
            }
            let existingCreditor = creditors.creditors.find(c => c.creditor.equals(outgoings[i].paidBy));
            if(existingCreditor){
                existingCreditor.value.push({
                    money: user.value,
                    group: outgoings[i].group,
                });
                existingCreditor.totalValue += user.value;
            } else {
                creditors.creditors.push({
                    creditor: outgoings[i].paidBy,
                    value: [{
                        money: user.value,
                        group: outgoings[i].group
                    }],
                    totalValue: user.value
                });
            }
            creditors.total += user.value;
        }
    }
    return creditors;
}

//Debitori
function getDebtors(outgoings, id){
    const debtors = {
        debtors: [],
        total: 0
    };
    for(let i = 0; i < outgoings.length; i++){
        if(outgoings[i].paidBy.equals(id) && !outgoings[i].isPaid){
            for(let j = 0; j < outgoings[i].users.length; j++){
                let existingDebtors = debtors.debtors.find(d => d.debtors.equals(outgoings[i].users[j].user));
                if(existingDebtors){
                    existingDebtors.value.push({
                        money: outgoings[i].users[j].value,
                        group: outgoings[i].group
                    });
                    existingDebtors.totalValue += outgoings[i].users[j].value;
                } else {
                    debtors.debtors.push({
                        debtors: outgoings[i].users[j].user,
                        value: [{
                            money: outgoings[i].users[j].value,
                            group: outgoings[i].group
                        }],
                        totalValue: outgoings[i].users[j].value
                    });
                }
                debtors.total += outgoings[i].users[j].value;;
            }
        }
    }
    return debtors;    
}

function checkDebtorsCreditors(debtors, creditors){
    for(let i = 0; i < debtors.debtors.length; i++){
        for(let j = 0; j < creditors.creditors.length; j++){
            if(debtors.debtors[i].debtors.equals(creditors.creditors[j].creditor)){
                if(debtors.debtors[i].totalValue > creditors.creditors[j].totalValue){
                    debtors.debtors[i].totalValue -= creditors.creditors[j].totalValue;
                    creditors.creditors.splice(j, 1);
                } else if(debtors.debtors[i].totalValue < creditors.creditors[j].totalValue){
                    creditors.creditors[j].totalValue -= debtors.debtors[i].totalValue;
                    debtors.debtors.splice(i, 1);
                } else {
                    debtors.debtors.splice(i, 1);
                    creditors.creditors.splice(j, 1);
                }
            }
        }
    }
    return {debtors, creditors};
}

//Bilancio
export const getReport = async (req, res) => {
    try {
        const { id } = req.params;
        
        const user = await User.findById(id);
        if (!user)
            return res.status(404).json({ message: 'User not found' });
        const outgoings = await Outgoing.find({ _id: { $in: user.outgoings } });
        if (!outgoings)
            return res.status(404).json({ message: 'Outgoings not found' });
        
        const people = checkDebtorsCreditors(getDebtors(outgoings, id), getCreditors(outgoings, id));
        const debtors = people.debtors;
        const creditors = people.creditors;

        res.status(200).json({ debtors, creditors });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}