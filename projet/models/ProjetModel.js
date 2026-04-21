// Models Projets

const db = require("../../db");

// Récupérer tous les projets
const getAllProjets = async () => {
    const [rows] = await db.query("SELECT * FROM projet");
    return rows;
};

// Récupérer un projet par son ID
const getProjetById = async (id) => {
    const [rows] = await db.query(
        "SELECT * FROM projet WHERE Id_projet = ?",
        [id]
    );
    return rows;
};

// Rechercher des projets par titre
const searchProjets = async (search, limit) => {
    const [rows] = await db.query(
        "SELECT * FROM projet WHERE titre LIKE ? LIMIT ?",
        [`%${search}%`, limit]
    );
    return rows;
};

// Créer un projet
const createProjet = async ({ titre, description, date_debut, date_echeance, Id_utilisateur }) => {
    const [result] = await db.query(
        "INSERT INTO projet (titre, description, date_debut, date_echeance, Id_utilisateur) VALUES (?, ?, ?, ?, ?)",
        [titre, description || null, date_debut || null, date_echeance || null, Id_utilisateur]
    );
    const [rows] = await db.query(
        "SELECT * FROM projet WHERE Id_projet = ?",
        [result.insertId]
    );
    return rows[0];
};
module.exports = { getAllProjets, getProjetById, searchProjets, createProjet };