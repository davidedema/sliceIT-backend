import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

/* REGISTER */
export const registerUser = async (req, res) => {
    try {
        const {
            email,
            nickname,
            password,
            name,
            surname
        } = req.body;

        // Check se mail è già presente nel db
        const existingEmail = await User.findOne({ email });
        if (existingEmail) return res.status(400).json({ message: "Email already exists" });

        // Check se nickname è già presente nel db
        const existingNick = await User.findOne({ nickname });
        if (existingNick) return res.status(400).json({ message: "Nickname already exists" });


        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);
        
        const newUser = new User({
            email,
            nickname,
            password: passwordHash,
            name,
            surname
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }   
}

/* LOGIN */
export const loginUser = (req, res) => {

}

export const prova = (req, res) => {
    res.send("prova");
}