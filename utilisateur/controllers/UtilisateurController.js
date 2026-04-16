// Controller Utilisateur

const {
    createUtilisateur,
    findUtilisateurByEmail,
    hashPassword,
    comparePassword,
    findUtilisateurById,
} = require("../models/UtilisateurModel");
const jwt = require("jsonwebtoken");

// Inscription
const register = async (req, res) => {
    try {
        const { nom, prenom, email, mot_de_passe } = req.body;

        // Vérifier si l'email existe déjà
        const existingUtilisateur = await findUtilisateurByEmail(email);
        if (existingUtilisateur.length > 0) {
            return res.status(400).send({
                message : "Cet email est déjà utilisé",
            });
        }

        // Hacher le mdp
        const hash = await hashPassword(mot_de_passe);

        // Crée l'utilisateur
        const result = await createUtilisateur({
            nom_utilisateur: nom,
            prenom_utilisateur: prenom,
            email_utilisateur: email,
            mdp_utilisateur: hash,
        });

        res.status(201).json({
            message: "Inscription réussie",
            Id_utilisateur: result.insertId,
            utilisateur: { nom, prenom, email, mot_de_passe },
        });
    } catch (error) {
        console.error("Erreur inscription", error.message);
        res.status(500).json({
            message : "Erreur lors de l'inscription",
        });
    }
};

const logout = (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    });
    res.json({ message : "Déconnexion réussie" });
};

const getMe = async (req, res) => {
    try {
        const utilisateurs = await findUtilisateurById(req.utilisateur.id);

        if(utilisateurs.length === 0) {
            return res.status(404).json({message: "Utilisateur introuvable"});
        }

        const utilisateur = utilisateurs[0];

        res.json({
            utilisateur: {
                id: utilisateur.Id_utilisateur,
                nom: utilisateur.nom_utilisateur,
                prenom: utilisateur.prenom_utilisateur,
                email: utilisateur.email_utilisateur

            }
        })
    } catch (error) {
        console.error("Erreur /me:", error.message);
        res.status(500).json({ message: "Erreur lors de la vérification de session"});
    }
};

module.exports = { register, logout, getMe };































































