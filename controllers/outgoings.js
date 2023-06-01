import User from "../models/user.js";
import Outgoing from '../models/outgoing.js';
import jwt from "jsonwebtoken";
import { get } from "mongoose";

//DEBITORI
function getDebtors(outgoings, id){
    const debtors = {
        value: [],
        debtors: [],
        total: 0
    };
    for(let i = 0; i < outgoings.length; i++){
        if(outgoings[i].paidBy === id){
            for(let j = 0; j < outgoings[i].users.length; j++){
                debtors.debtors.push(outgoings[i].users[j].user);
                debtors.value.push(outgoings[i].users[j].value);
                total += outgoings[i].users[j].value;
            }
        }
    }
    return debtors;    
}

//CREDITORI
function getCreditors(outgoings, id){
    const creditors = {
        value: [],
        creditors: [],
        total: 0
    };
    for(let i = 0; i < outgoings.length; i++){
        if(!outgoings[i].paidBy.equals(id)){
            let user = outgoings[i].users.find(u => u.user.equals(id));
            if(!user){
                continue;
            }
            creditors.value.push(user.value);
            creditors.creditors.push(outgoings[i].paidBy);
            creditors.total += user.value;
        }
    }
    return creditors;
}

//CREAZIONE BILANCIO
function getDebtorsCreditors(outgoings, id){
    const response = {
        debtors: getDebtors(outgoings, id),
        creditors: getCreditors(outgoings, id)
    };
    return response;
}

export const getOutgoings = async (req, res) => {
    try {
        const { id } = req.params;

        let token = req.header("x-auth-token");
        if (token.startsWith("Bearer "))
            token = token.slice(7, token.length).trimLeft();

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if (verified.id !== id)
            return res.status(401).json({ message: 'Not authorized' });

        const user = await User.findById(id);
        if (!user)
            return res.status(404).json({ message: 'User not found' });

        const outgoings = await Outgoing.find({ _id: { $in: user.outgoings } });
        if (!outgoings)
            return res.status(404).json({ message: 'Outgoings not found' });

        const response = getDebtorsCreditors(outgoings, id);
        //const debtors = getDebtors(outgoings, id); //response.debtors;
        const creditors = getCreditors(outgoings, id); //response.creditors;

        res.status(200).json(creditors);
    }catch(error){
        console.error(error);
        res.status(500).json("Internal server error");
    }
}