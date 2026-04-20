// Models Tâches

const db = require("../../db");

// Récupérer toutes les tâches
const { getAllTasks } = async () => {
    const [rows] = await db.query("SELECT * FROM tache");
    return rows;
}

// Récupérer une tâche par son ID
const { getTaskById } = async (id) => {
    const [rows] = await db.query("SELECT * FROM taches WHERE Id_tache = ?",
        [id]
    );
}

// Rechercher une tâche par son titre
const { searchTasks } = async (search, limit) => {
    const [rows] = await db.query("SELECT * FROM taches WHERE titre LIKE ? LIMIT ?",
        [`${search}%`, limit]
    );
}

module.exports = { getAllTasks, getTaskById, searchTasks };