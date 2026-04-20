// Controller Tâches

const { getAllTasks, searchTasks, getTaskById } = require("../Models/TacheModel.js");

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



module.exports = { getAllt, getTByID };