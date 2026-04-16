// Router Projets
// chemin : /api/projets

const express = require("express");
const { getAll, getById } = require("../controllers/ProjetController");
const router = express.Router();

// GET /api/projets - Récupérer tous les projets
router.get("/", getAll);

// GET /api/projets/:id - Récupérer un projet par son ID
router.get('/:id', getById);

module.exports = router;