import express from 'express';
import {auth} from "../middlewares/auth.js";
import {generateArticle} from "../controllers/aiController.js";

const aiRouter = express.Router();

// Here we also store in the auth the plan data and usage and the path to where we want to generate the ai article
aiRouter.post('/generate-article', auth, generateArticle);

export default aiRouter;