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
        nom,
        prenom,
        email,
        mot_de_passe
    } = utilisateurData;

    const [result] = await db.query(
        `INSERT INTO utilisateur
        (nom_utilisateur, prenom_utilisateur, email_utilisateur, mdp_utilisateur)
    VALUE (?, ?, ?, ?)`,
        [
            nom,
            prenom,
            email,
            mot_de_passe,
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

module.exports = {
    findUtilisateurByEmail,
    findUtilisateurById,
    hashPassword,
    comparePassword,
    createUtilisateur,
};