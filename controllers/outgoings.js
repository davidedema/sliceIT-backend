import Group from "../models/group.js";
import User from "../models/user.js";
import Outgoing from '../models/outgoing.js';
import jwt from "jsonwebtoken";

//*CREAZIONE BILANCIO
function getDebtorsCreditors(outgoing){
    let debtors = [
        value =[],
        debtors = [],
        total = 0
    ];
    let creditors = [
        value =[],
        creditors = [],
        total = 0
    ];
    for(let i = 0; i < outgoing.users.length; i++){
        if(outgoing.users[i].value < 0){
            debtors.debtors.push(outgoing.users[i]);
            debtors.value.push(outgoing.users[i].value);
            total += outgoing.users[i].value;
        }else{
            creditors.creditors.push(outgoing.users[i]);
            creditors.value.push(outgoing.users[i].value);
            total += outgoing.users[i].value;
        }
    }
    return {
        debtors, 
        creditors
    };
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

        const debtors = getDebtorsCreditors(outgoings).debtors;
        const creditors = getDebtorsCreditors(outgoings).creditors;

        res.status(200).json({debtors, creditors});
    }catch(error){
        console.error(error);
        res.status(500).json("Internal server error");
    }
}