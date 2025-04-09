import express from "express";
import {
  getAllGadgets,
  createGadget,
  updateGadget,
  deleteGadget,
  triggerSelfDestruct
} from "../Controllers/gadgetsController.js";
import { authMiddleware } from "../Middlewares/auth.js";

const router = express.Router();

router.get("/", authMiddleware, getAllGadgets);
router.post("/", authMiddleware, createGadget);
router.patch("/:id", authMiddleware, updateGadget);
router.delete("/:id", authMiddleware, deleteGadget);
router.post("/:id/self-destruct", authMiddleware, triggerSelfDestruct);

export default router;