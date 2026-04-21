// Router Taches
// chemin : /api/taches

const express = require("express");
const { getAllByProjet, getTByID, create } = require("../controllers/TacheController");
const router = express.Router();

// GET /api/taches/projet/:id - Récupérer les tâches d'un projet
router.get("/projet/:id", getAllByProjet);

// GET /api/taches/:id - Récupérer une tâche par son ID
router.get("/:id", getTByID);

// POST /api/taches - Créer une tâche
router.post("/", create);

module.exports = router;