import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";

dotenv.config();
const app = express();
const PORT: number = parseInt(process.env.PORT as string);

app.use(cors());

app.listen(PORT, () => {
    console.log(`Speak lord, your server is listening on port ${PORT}`);
});
