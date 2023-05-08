import jwt from 'jsonwebtoken';

export const validateToken = (req, res, next) => {
    try {
        let token = req.header("x-auth-token");     // il token si trova in x-auth-token
        if (!token) return res.status(403).json({ message: "Access deniend" });

        if (token.startsWith("Bearer ")) {          // se il token inizia con "Bearer " -> settare a frontend
            token = token.slice(7, token.length).trimLeft();
        }
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}