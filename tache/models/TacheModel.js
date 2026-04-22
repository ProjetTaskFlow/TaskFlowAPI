// Models Tâches
const db = require("../../db");

// Récupérer toutes les tâches
const getAllTasks = async () => {
    const [rows] = await db.query("SELECT * FROM taches");


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
};

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


// Récupérer toutes les tâches
const { getAllTasks } = async () => {
    const [rows] = await db.query("SELECT * FROM tache");
    return rows;
}

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
    await db.query(
        `UPDATE taches SET nom_tache = ?, description = ?, statut = ?, Id_utilisateur = ?, date_echeance = ?, temps_prevu = ?, temps_reel = ?
         WHERE Id_tache = ?`,
        [nom_tache, description, statut, Id_utilisateur || null, date_echeance || null, temps_prevu || null, temps_reel || null, id]
    );
    const [rows] = await db.query(
        "SELECT * FROM taches WHERE Id_tache = ?",
        [id]
    );
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
