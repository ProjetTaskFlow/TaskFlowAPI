// Permet de configurer le pool de connexions à MySQL
//Pour faire des requêtes asynchrones async/await

const mysql = require("mysql2/promise");
require("dotenv").config();

/* Pool de connexions
* Permet de gérer plusieurs connexions simultanées
* Réutiliser des connexions existantes
* Gestion automatique de la disponibilité
* Limiter le nombre de connexions (en même temps)
* */

const db = mysql.createPool({
    // Paramètres de connexion
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,

    // Paramètre du pool
    // si plus de connexions dispo alors, elles attendent
    waitForConnections: true,
    // Limiter le ombre max de connexions
    connectionLimit: 10,

    /* PARAMETRES OPTIONNELS mais recommandés*/
    // En cas d'échec de connexion, réesayer
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
    // Timeout de connexion (millisecondes)
    connectTimeout: 10000, // 10 secondes
});

(async () => {
    try {
        const connection = await db.getConnection();
        console.log("Connecté à la base de données MySQL");

        // Se déconnecter
        connection.release();
    } catch (error) {
        console.error("Erreur de connexion à MySQL : ", error.message);

        // Arrête l'application avec un cde erreur 1
        process.exit(1);
    }
})();

module.exports = db;