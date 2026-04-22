// Models Tâches
const db = require("../../db");

// Récupérer toutes les tâches
const getAllTasks = async () => {
    const [rows] = await db.query("SELECT * FROM taches");
    return rows;
};

// Récupérer une tâche par son ID
const getTaskById = async (Id_tache) => {
    const [rows] = await db.query(
        "SELECT * FROM taches WHERE Id_tache = ?",
        [Id_tache]
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

// Modifier une tâche
const updateTask = async (id, { nom_tache, description, statut, Id_utilisateur, date_echeance, temps_prevu, temps_reel }) => {
    const task = await getTaskById(id);
    if (task.length === 0) return null;

    const actual = task[0];
    await db.query(
        `UPDATE taches SET nom_tache = ?, description = ?, statut = ?, Id_utilisateur = ?, date_echeance = ?, temps_prevu = ?, temps_reel = ?
         WHERE Id_tache = ?`,
        [
            nom_tache ?? actual.nom_tache,
            description ?? actual.description,
            statut ?? actual.statut,
            Id_utilisateur ?? actual.Id_utilisateur,
            date_echeance ?? actual.date_echeance,
            temps_prevu ?? actual.temps_prevu,
            temps_reel ?? actual.temps_reel,
            id
        ]
    );
    const [rows] = await db.query("SELECT * FROM taches WHERE Id_tache = ?", [id]);
    return rows[0];
};

// Supprimer une tâche
const deleteTask = async (id) => {
    const [result] = await db.query(
        "DELETE FROM taches WHERE Id_tache = ?",
        [id]
    );
    return result;
};

// Mettre à jour le statut
const updateStatutTask = async (id, statut) => {
    await db.query(
        "UPDATE taches SET statut = ? WHERE Id_tache = ?",
        [statut, id]
    );
    const [rows] = await db.query(
        "SELECT * FROM taches WHERE Id_tache = ?",
        [id]
    );
    return rows[0];
};

module.exports = { getAllTasks, getTaskById, searchTasks, getTasksByProjetId, createTask, updateTask, deleteTask, updateStatutTask };