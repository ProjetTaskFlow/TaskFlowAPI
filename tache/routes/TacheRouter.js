// Router Taches
// chemin : /api/taches

const express = require("express");
const {getAllTasks, getTaskById } = require("../models/TacheModel");
const router = express.Router();

// GET/api/taches - Récupérer toutes les taches
router.get("/", getAllTasks);

// GET/api/taches/:id - Récupérer une tache par son ID
router.get("/:id/taches", getTaskById);

module.exports = router;