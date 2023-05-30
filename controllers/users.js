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
        /*console.log("getUserGroups");*/
        const { id } = req.params;
        let token = req.header("x-auth-token");
        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trimLeft();
        }
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        // se chi ha fatto la richiesta non corrisponde all'utente cercato
        if (verified.id !== id)
            return res.status(401).json({ message: 'Not authorized' });
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: 'User not found' });
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
        // se chi ha fatto la richiesta non corrisponde all'utente cercato
        if (verified.id !== id)
            return res.status(401).json({ message: 'Not authorized' });
        const user = await User.findById(id);
        if (!user)
            return res.status(404).json({ message: 'User not found' });
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
