import jwt from 'jsonwebtoken';

export const validateToken = (req, res, next) => {
    let token = req.header("x-auth-token");     // il token si trova in x-auth-token
    if (!token) return res.status(401).json({ message: "Not authorized" });

    if (token.startsWith("Bearer ")) {          // se il token inizia con "Bearer " -> settare a frontend
        token = token.slice(7, token.length).trimLeft();
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(401).json({ message: "Not authorized" });
        req.user = user;
        next();
    });
}