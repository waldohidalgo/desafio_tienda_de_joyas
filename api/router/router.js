import { Router } from "express";
import {
  renderJoyasHATEOAS,
  getCategorias,
  getJoyabyId,
} from "../controllers/index.js";

const router = Router();

router.get("/", (req, res) => {
  res.redirect("/joyas");
});

router.get("/joyas", renderJoyasHATEOAS);

router.get("/joyas/categoria/:categoria", getCategorias);
router.get("/joyas/categoria", (req, res) => {
  res.send("Debes ingresar una categoria en /joyas/categoria/:categoria");
});

router.get("/joyas/id/:id", getJoyabyId);
export default router;
