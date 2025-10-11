import { Router } from "express";   
import { createItem } from "../controller/itemController";

const router = Router();
router.post('/', createItem);
export default router;