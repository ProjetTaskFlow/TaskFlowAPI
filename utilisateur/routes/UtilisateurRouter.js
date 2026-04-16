// Utilisateur router
// chemin : /api/utilisateurs

const express = require('express');
const { register, login, getMe, logout } = require('../controllers/UtilisateurController');
const { verifyToken } = require('../../middleware/authMiddleware');
const router = express.Router();

// Vérification de session utilisateur
// Route protégée
// GET /api/utilisateurs/me

router.get("/me", verifyToken, getMe);

// Inscription
// POST /api/utilisateurs/register
// Body : { nom, prenom, email, mot_de_passe }
router.post("/register", register);

// Connexion
// POST /api/utilisateurs/login
// Body : { email, mot_de_passe }
// Retourne un token JWT
router.post("/login", login);

// Déconnexion
// Route protégée
// POST /api/utilisateurs/logout
router.post("/logout", logout);

module.exports = router;

