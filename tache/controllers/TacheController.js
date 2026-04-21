// Controller Tâches

const { getAllTasks, searchTasks, getTaskById, getTasksByProjetId, createTask } = require("../Models/TacheModel.js");

// Récupérer toutes les tâches
const getAllt = async (req, res) => {
    try {
        const { search, limit } = req.query;
        let taches;

        if (search && search.trim().length >= 2) {
            taches = await searchTasks(search.trim(), parseInt(limit) || 5);
        } else {
           taches = await getAllTasks();
        }
        res.json({
            message: "Tâches récupérés avec succès",
            count: taches.length,
            taches
        });
    } catch (error) {
        console.error("Erreur de récupération des tâches", error.message);
        res.status(500).json({message: "Erreur récupération des tâches"});
    }
};

// Récupérer une tâche par son ID
const getTByID = async (req, res) => {
    try {
        const {id} = req.params;

        const taches = await getTaskById(id);

        if(taches.length === 0) {
            return res.status(404).json({ message : "Tâche non trouvé"});
        }
        res.json({
            message: "Tâche récupéré avec succès",
            tache: taches[0],
        });
    } catch(error) {
        console.error("Erreur de récupération de la tâche", error.message);
        res.status(500).json({ message: "Erreur de récupération de la tâche",
        });
    }
}

// Récupérer les tâches d'un projet groupées par statut
const getAllByProjet = async (req, res) => {
    try {
        const { id } = req.params;

        const taches = await getTasksByProjetId(id);

        res.json({
            message: "Tâches récupérées avec succès",
            count: taches.length,
            taches,
        });
    } catch (error) {
        console.error("Erreur de récupération des tâches du projet", error.message);
        res.status(500).json({ message: "Erreur de récupération des tâches du projet" });
    }
};

// Créer une tâche
const create = async (req, res) => {
    try {
        const { nom_tache, description, statut, Id_projet, Id_utilisateur, date_echeance, temps_prevu } = req.body;

        const tache = await createTask({ nom_tache, description, statut, Id_projet, Id_utilisateur, date_echeance, temps_prevu });

        res.status(201).json({
            message: "Tâche créée avec succès",
            tache,
        });
    } catch (error) {
        console.error("Erreur de création de la tâche", error.message);
        res.status(500).json({ message: "Erreur de création de la tâche" });
    }
};

module.exports = { getAllt, getTByID, getAllByProjet, create };