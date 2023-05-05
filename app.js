import express from 'express';
import authRoutes from './routes/auth.js';


const app = express();
const port = 3000;

app.use("/api/v1/auth", authRoutes);

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});