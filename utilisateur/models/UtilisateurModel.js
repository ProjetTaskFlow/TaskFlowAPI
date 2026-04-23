// Model Utilisateur

const db = require("../../db.js");
const bcrypt = require("bcryptjs");

// Rechercher un utilisateur par son ID
const findUtilisateurById = async (id) => {
    const [rows] = await db.query(
        "SELECT * FROM utilisateur WHERE Id_utilisateur = ?",
        [id]
    );
    return rows;
};

// Rechercher un utilisateur par son email
const findUtilisateurByEmail = async (email) => {
    const [rows] = await db.query(
        "SELECT * FROM utilisateur WHERE email_utilisateur = ?",
        [email],
    );
    return rows;
}

// Créer un nouvel utilisateur
const createUtilisateur = async (utilisateurData) => {
    // Extraction des données
    const {
        nom_utilisateur,
        prenom_utilisateur,
        email_utilisateur,
        mdp_utilisateur
    } = utilisateurData;

    const [result] = await db.query(
        `INSERT INTO utilisateur
        (nom_utilisateur, prenom_utilisateur, email_utilisateur, mdp_utilisateur)
    VALUES (?, ?, ?, ?)`,
        [
            nom_utilisateur,
            prenom_utilisateur,
            email_utilisateur,
            mdp_utilisateur
        ],
    );
    return result;
};

// Hacher un mdp
const hashPassword = async (password) => {
   const rounds = parseInt(process.env.BCRYPT_ROUNDS) || 10;
   return await bcrypt.hash(password, rounds);
};

// Comparer un mot de passe
const comparePassword = async (password, hash) => {
    return await bcrypt.compare(password, hash);
};

const updateUtilisateur = async (id, { nom_utilisateur, prenom_utilisateur, email_utilisateur }) => {
    await db.query(
        `UPDATE utilisateur SET nom_utilisateur = ?, prenom_utilisateur = ?, email_utilisateur = ?
         WHERE Id_utilisateur = ?`,
        [nom_utilisateur, prenom_utilisateur, email_utilisateur, id]
    );
    const [rows] = await db.query(
        "SELECT * FROM utilisateur WHERE Id_utilisateur = ?",
        [id]
    );
    return rows[0];
};

const updatePassword = async (id, newPassword) => {
    const hash = await bcrypt.hash(newPassword, parseInt(process.env.BCRYPT_ROUNDS) || 10);
    await db.query(
        "UPDATE utilisateur SET mdp_utilisateur = ? WHERE Id_utilisateur = ?",
        [hash, id]
    );
    return true;
};

module.exports = {
    findUtilisateurByEmail,
    findUtilisateurById,
    hashPassword,
    comparePassword,
    createUtilisateur,
    updatePassword,
    updateUtilisateur,
};