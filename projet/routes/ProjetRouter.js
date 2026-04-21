// Router Projets
// chemin : /api/projets
const express = require("express");
const { getAll, getById, create } = require("../controllers/ProjetController");
const router = express.Router();

// GET /api/projets - Récupérer tous les projets
router.get("/", getAll);

router.post("/", create);

// GET /api/projets/:id - Récupérer un projet par son ID
router.get('/:id/projet', getById);

// POST /api/projets - Créer un nouveau projet
router.post("/", create);

module.exports = router;
