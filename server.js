// Permet de charger les variables d'environnement depuis .env
require("dotenv").congig();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

// Connexion à la base de données
const db = require("./db");

// === Importation des routes ===
const projetRoutes = require("./projet/routes/ProjetRouter");
const tacheRoutes = require("./tache/routes/TacheRouter");
const utilisateurRoutes = require("./utilisateur/routes/UtilisateurRouter");

// Création de l'application Express
const app = express();
