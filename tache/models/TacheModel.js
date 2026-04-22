// Model Tâches

const db = require("../../db");

// Création d'une tâche
const createTask = async (taskData) => {
    // Extraction des données
    const {
        nom,
        description,
        statut,
        date_echeance,
        temps_prevu,
        temps_reel
    } = taskData;

    const [result] = await db.query(
        `INSERT INTO taches
        (nom_tache, description, statut, date_echeance, temps_prevu, temps_reel)
        VALUES (?, ?, ?, ?, ?, ?)`,
        [
           nom,
           description,
           statut,
           date_echeance,
           temps_prevu,
           temps_reel
        ],
    );
    return result;
};

// Récupérer tous les articles
const getAllTasks = async () => {
    const [rows] = await db.query(`SELECT * FROM taches`);
    return rows;
};

// Récupérer une tâche par son ID
const getTaskById = async (Id_tache) => {
    const [rows] = await db.query(`SELECT * FROM taches WHERE Id_tache = ?`,
        [Id_tache]
    );
    return rows;
}

// Modifier une tâche
const updateTask = async (Id_tache, taskData) => {

    // Récupération de tâche actuelle
    const task = await getTaskById(Id_tache);

    // Si tâche n'existe pas
    if (task.length === 0) return null;

    const actualTask = task[0];

    // Si l'utilisateur n'envoie pas un champ, on garde l'ancienne valeur
    const nom = taskData.nom ?? actualTask.nom_tache;
    const description = taskData.description ?? actualTask.description;
    const statut = taskData.statut ?? actualTask.statut;
    const date_echeance = taskData.date_echeance ?? actualTask.date_echeance;
    const temps_prevu = taskData.temps_prevu ?? actualTask.temps_prevu;
    const temps_reel = taskData.temps_reel ?? actualTask.temps_reel;

    const [result] = await db.query(
        `UPDATE taches SET
            nom_tache = ?,
            description = ?,
            statut = ?,
            date_echeance = ?,
            temps_prevu = ?,
            temps_reel = ?
        WHERE Id_tache = ?`,
        [
            nom,
            description,
            statut,
            date_echeance,
            temps_prevu,
            temps_reel,
            Id_tache,
        ]
    );

    // Si aucune ligne modifiée, la tâche n'existe pas
    if (result.affectedRows === 0) {
        return null;
    }
    return result;
};

// Supprimer tâche
const deleteTask = async (Id_tache) => {
    const [result] = await db.query(
        `DELETE FROM taches WHERE Id_tache = ?`,
        [Id_tache]
    );

    if (result.affectedRows === 0) {
        return null;
    }

    return result;
}


// Rechercher une tâche par son titre
const { searchTasks } = async (search, limit) => {
    const [rows] = await db.query("SELECT * FROM taches WHERE nom_tache LIKE ? LIMIT ?",
        [`${search}%`, limit]
    );
    return rows;
}
module.exports = { createTask, getAllTasks, getTaskById, updateTask, deleteTask, searchTasks };
