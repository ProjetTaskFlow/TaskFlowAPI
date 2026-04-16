// Controller Projet
const { getAllProjets, getProjetById, searchProjets } = require("../models/ProjetModel.js");

// Récupérer tous les projets
const getAll = async (req, res) => {
    try {
        const {search, limit} = req.query;

        if (search && search.trim().length >= 2) {
            const projets = await searchProjets(search.trim(), parseInt(limit) || 5);
            return res.json({ projets })
        } else {
            projets = await getAllProjets();
        }
        const projets = await getAllProjets();
        res.json({
            message: "Projets récupérés avec succès",
            count: projets.length,
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

module.exports = { getAll, getById };






























