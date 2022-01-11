import dotenv from 'dotenv';
import "reflect-metadata";
import express from "express";
import cors from "cors";

import { router } from "./routes";

import "./database";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());

app.use(express.json());
app.use(router)

app.listen(PORT, () => {
    console.log(`Server on port: ${PORT}`)
})
