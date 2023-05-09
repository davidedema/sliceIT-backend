import User from '../models/user.js';
import Group from '../models/group.js';
import Outgoing from '../models/outgoing.js';
import bcrypt from 'bcrypt';

export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getUserGroups = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        const groups = await Group.find({ _id: { $in: user.groups } });
        res.status(200).json(groups);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getUserOutgoings = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        const outgoings = await Outgoing.find({ _id: { $in: user.outgoings } });
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
        const user = await User.findById(id);
        if(!user)
            return res.status(404).json({ message: 'User not found' });

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        user.email = email;
        user.nickname = nickname;
        user.password = passwordHash;
        user.firstName = firstName;
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
        try{
            const user = await User.findByIdAndDelete(id);
        } catch (error) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
