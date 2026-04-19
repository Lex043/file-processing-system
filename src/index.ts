import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { uploadRoutes } from "./routes/upload.routes";

dotenv.config();
const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (_, res) => {
    res.status(200).json({
        message: "Api is healthy..",
    });
});

app.use("/upload", uploadRoutes);

app.listen(PORT, () => {
    console.log(`Speak lord, your server is listening on port ${PORT}`);
});
