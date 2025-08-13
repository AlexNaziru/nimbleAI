import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import {clerkMiddleware, requireAuth} from '@clerk/express'
import aiRouter from "./routes/aiRoutes.js";


const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

// Routes
app.get('/', (req, res) => res.send('Server is running!') );
app.use(requireAuth());
//importing routes
app.use('/api/ai', aiRouter)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));