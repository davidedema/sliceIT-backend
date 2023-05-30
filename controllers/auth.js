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

        if (!email || !nickname || !password)
            return res.status(400).json({ message: "Missing required fields" });
        
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
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password ) 
            return res.status(400).json({ message: "Invalid credentials" });

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Email doesn't exists" });

        const isMatch = await bcrypt.compare(password, user.password);
        if ( !isMatch) return res.status(400).json({ message: "Invalid credentials" });
        
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        user.password = undefined;
        res.status(200).json({ user, token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}