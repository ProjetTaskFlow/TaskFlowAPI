// Permet de charger les variables d'environnement depuis .env
require("dotenv").config();

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

// MIDDLEWARE
// Parser les JSON
app.use(express.json());

// Logger de requêtes HTTP dans la console
app.use(morgan("dev"));

// Sert les fichiers statiques (images, produits)
app.use(express.static("public"));

// CORS = Cross-Origin Ressource Sharing
// Permet les requêtes cross-origin (qui viennent du front)
// OBLIGATOIRE sinon navigateur bloque les requêtes

app.use(
    cors({
        origin: process.env.FRONTEND_URL || "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"], //Il faudra surement rajouter plus de méthodes HTTP
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true
    })
);

// Parse les cookies dans req
app.use(cookieParser());

// ROUTES

// Route de test pour vérifier que l'api fonctionne
app.get("/health", (req,res) => {
    res.json({
        status: "OK",
        message: "API fonctionnelle",
    });
});

// Routes de l'API
app.use("/api/projets", projetRoutes);
app.use("/api/taches", tacheRoutes);
app.use("/api/utilisateurs", utilisateurRoutes);

// GESTIONS DES ERREURS
// Routes 404
app.use((req, res) => {
    res.status(404).json({
        message: "Route non trouvée",
    });
});

// DÉMARRAGE DU SERVEUR
const port = process.env.PORT || 3000;
const host = process.env.HOST || "localhost";

app.listen(port, host, () => {
    console.log(`Serveur démarré sur http://${host}:${port}`);
})
