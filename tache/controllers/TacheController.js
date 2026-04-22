// Controller Tâches

const { getAllTasks, searchTasks, getTaskById, getTasksByProjetId, createTask, updateStatutTask, updateTask, deleteTask } = require("../Models/TacheModel.js");

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

// Modifier une tâche
const update = async(req, res) => {
    try {
        const { id } = req.params;
        const { nom_tache, description, statut, Id_utilisateur,date_echeance, temps_prevu, temps_reel } = req.body;

        const TacheExiste = await getTaskById(id);
        if(tacheExiste.length === 0) {
            return res.status(404).json({ message : "Tâche non trouvée" });
        }
        const tache = await updateTask(id, { nom_tache, description, statut, Id_utilisateur, date_echeance, temps_prevu, temps_reel });

        res.json({
            message : "Tâche modifiée avec succès",
            tache,
        });
    } catch (error) {
        console.error("Erreur de modification de la tâche", error.message);
        res.status(500).json({ message : "Erreur de modification de la tâche"});
    }
};

// Supprimer une tâche
const remove = async (req, res) => {
    try {
    const {id} = req.params;

    const TacheExiste = await getTaskById(id);
    if (TacheExiste.length === 0) {
        return res.status(404).json({message: "Erreur de suppression de la tâche"});
    }

    await deleteTask(id);

    res.status(204).send();
} catch (error) {
    console.error("Erreur de suppression de la tâche", error.message);
    res.status(500).json({ message : "Erreur de suppression de la tâche"});
    }
};

// Mettre à jour le statut
const updateStatut = async (req,res) => {
    try {
        const {id} = req.params;
        const statut = req.body;

        if (!statut) {
            return res.status(400).json({ message: "Le status est requis"});
        }

        const tacheExiste = await getTaskById(id);

        if (TacheExiste.length === 0) {
            return res.status(404).json({ message: "Tâche non trouvée"});
        }
        const tache = await updateStatutTask(id, statut);

        res.json({
            message: "Status mis à jour avec succès",
            tache,
        });
    } catch (error) {
        console.error("Erreur de mise à jour du statut", error.message);
        res.status(500).json({ message : "Erreur de mise à jour du statut"});
    }
}
module.exports = { getAllt, getTByID, getAllByProjet, create, update, remove, updateStatut };