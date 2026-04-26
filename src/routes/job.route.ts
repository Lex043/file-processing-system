import { Router } from "express";
import { jobController } from "../controllers/job.controller";

export const jobRoutes = Router();

jobRoutes.get("/:id", jobController.getJobStatus);
jobRoutes.get("/:id/result", jobController.getJobResult);
