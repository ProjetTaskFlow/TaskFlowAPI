// Models Tâches
const db = require("../../db");

// Récupérer toutes les tâches
const getAllTasks = async () => {
    const [rows] = await db.query("SELECT * FROM taches");
    return rows;
};

// Récupérer une tâche par son ID
const getTaskById = async (id) => {
    const [rows] = await db.query(
        "SELECT * FROM taches WHERE Id_tache = ?",
        [id]
    );
    return rows;
};

// Rechercher une tâche par son nom
const searchTasks = async (search, limit) => {
    const [rows] = await db.query(
        "SELECT * FROM taches WHERE nom_tache LIKE ? LIMIT ?",
        [`${search}%`, limit]
    );
    return rows;
};

// Récupérer les tâches d'un projet
const getTasksByProjetId = async (Id_projet) => {
    const [rows] = await db.query(
        "SELECT * FROM taches WHERE Id_projet = ?",
        [Id_projet]
    );
    return rows;
};

// Créer une tâche
const createTask = async ({ nom_tache, description, statut, Id_projet, Id_utilisateur, date_echeance, temps_prevu }) => {
    const [result] = await db.query(
        `INSERT INTO taches (nom_tache, description, statut, Id_projet, Id_utilisateur, date_echeance, temps_prevu)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [nom_tache, description, statut || "todo", Id_projet, Id_utilisateur || null, date_echeance || null, temps_prevu || null]
    );
    const [rows] = await db.query(
        "SELECT * FROM taches WHERE Id_tache = ?",
        [result.insertId]
    );
    return rows[0];
};

module.exports = { getAllTasks, getTaskById, searchTasks, getTasksByProjetId, createTask };