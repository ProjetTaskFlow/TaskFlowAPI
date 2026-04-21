// Controller Projet
const { getAllProjets, getProjetById, searchProjets } = require("../models/ProjetModel.js");

// Récupérer tous les projets
const getAll = async (req, res) => {
    try {
        const { search, limit } = req.query;
        let projets;

        if (search && search.trim().length >= 2) {
            projets = await searchProjets(search.trim(), parseInt(limit) || 5);
        } else {
            projets = await getAllProjets();
        }

        res.json({
            message: "Projets récupérés avec succès",
            count: projets.length,
            projets,
        });
        } catch (error) {
        console.error("Erreur de récupération des projets", error.message);
        res.status(500).json({ message: "Erreur  récupération des projets"});
        }
    };

// Récupérer un projet par son ID
const getById = async (req, res) => {
    try {
        const { id } = req.params;

        const projets = await getProjetById(id);

        if(projets.length === 0) {
            return res.status(404).json({ message : "Projet non trouvé"});
        }

        res.json({
            message : "Projet récupéré avec succès",
            projet: projets[0],
        });
    } catch (error) {
        console.error("Erreur de récupération du projet", error.message);
        res.status(500).json({ message: "Erreur de récupération du projet",
        });
    }
};

// Créer un projet
const create = async (req, res) => {
    try {
        const { titre, description, date_debut, date_echeance, Id_utilisateur } = req.body;

        if (!titre || !Id_utilisateur) {
            return res.status(400).json({ message: "titre et Id_utilisateur sont requis" });
        }

        const projet = await createProjet({ titre, description, date_debut, date_echeance, Id_utilisateur });

        res.status(201).json({
            message: "Projet créé avec succès",
            projet,
        });
    } catch (error) {
        console.error("Erreur de création du projet", error.message);
        res.status(500).json({ message: "Erreur de création du projet" });
    }
};

module.exports = { getAll, getById, create };






























