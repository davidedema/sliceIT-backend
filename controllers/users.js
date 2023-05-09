import User from '../models/user.js';
import Group from '../models/group.js';
import Outgoing from '../models/outgoing.js';

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

}

export const deleteUser = async (req, res) => {

}
