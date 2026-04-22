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
        const { nom_utilisateur, prenom_utilisateur, email_utilisateur, mdp_utilisateur } = req.body;

        // Vérifier si l'email existe déjà
        const existingUtilisateur = await findUtilisateurByEmail(email_utilisateur);
        if (existingUtilisateur.length > 0) {
            return res.status(400).json({ message: "Cet email est déjà utilisé" });
        }

        // Hacher le mdp
        const hash = await hashPassword(mdp_utilisateur);

        // Crée l'utilisateur
        const result = await createUtilisateur({
            nom_utilisateur,
            prenom_utilisateur,
            email_utilisateur,
            mdp_utilisateur: hash,
        });

        res.status(201).json({
            message: "Inscription réussie",
            Id_utilisateur: result.insertId,
        });
    } catch (error) {
        console.error("Erreur inscription", error.message);
        res.status(500).json({
            message : "Erreur lors de l'inscription",
        });
    }
};

// Connexion
const login = async (req,res) => {
    try {
        const { email, mot_de_passe } = req.body;

        // Rechercher l'utilisateur
        const utilisateurs = await findUtilisateurByEmail(email);

        if (!utilisateurs || utilisateurs.length === 0) {
            return res.status(401).json({
                message: "Identifiants incorrects"
            });
        }

        const utilisateur = utilisateurs[0];

        // Vérifier le mdp
        const isMatch = await comparePassword(mot_de_passe, utilisateur.mdp_utilisateur);

        if (!isMatch) {
            return res.status(401).json({
                message: "Identifiants incorrects"
            });
        }

        // Générer le token JWT
        const expire = parseInt(process.env.JXT_EXPIRES_IN, 10) || 3600;
        const token = jwt.sign({
            id: utilisateur.Id_utilisateur, //SQL initial : Id_utilisateur
            email: utilisateur.email_utilisateur, //SQL initial : email_utilisateur
        },
            process.env.JWT_SECRET,
            {expiresIn: expire},
        );

        // On place le token dans un cookie HTTPOnly
        res.cookie("token", token, {
            httpOnly: true,
            secure: false, // Mettre en true en HTTPSn en local ça ne marche pas
            sameSite: "lax",
            maxAge: expire * 1000,
        });

        res.json({
            message: "Connexion réussie",
            utilisateur: {
                id: utilisateur.Id_utilisateur,
                nom: utilisateur.nom_utilisateur,
                prenom: utilisateur.prenom_utilisateur,
                email: utilisateur.email_utilisateur,
            },
        });

    } catch (error) {
        console.error("Erreur de connexion utilisateur", error.message);
        res.status(500).json({
            message: "Erreur lors de la connexion",
        });
    }
};

// Déconnexion
const logout = (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: false, // Même chose ici, mettre en true
        sameSite: "lax"
    });
    res.json({ message : "Déconnexion réussie" });
};

/* Permet au front de rafraichir les données du back
* Automatiquement le navigateur envoie le cookie
* Le middleware vérifie le JWT
* Si le token est valide, on retourne les infos du client
* */

const getMe = async (req, res) => {
    try {
        // req.client.id vient du JWT decodé par le middleware verifyToken
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

module.exports = { register, login, logout, getMe };































































