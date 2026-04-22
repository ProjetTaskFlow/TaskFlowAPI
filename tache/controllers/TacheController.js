// Controlleur Taches
const { createTask, getAllTasks, getTaskById, updateTask, deleteTask } = require("../models/TacheModel");

// Récupérer toutes les tâches
const getAll = async(req, res) => {
    try {
        const tasks = await getAllTasks();
        res.json({
            message: "Tâches récupérés avec succès",
            count: tasks.length,
            tasks,
        })
    } catch (error) {
        console.error("Erreur de récupération des tâches", error.message)
        res.status(500).json({
            message: "Erreur de récupération des tâches",
        });
    }
};