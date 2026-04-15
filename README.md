# API application web TaskFlow
API REST dévéloppé avec Node.js et Express pour la gestion de l'application web TaskFlow

## Prerequis

- [Node.js](https://nodejs.org/) >= 18
- npm
- MySQL (Base de données fonctionnelle)

## Quickstart
```bash
# 1. Cloner le depot
git clone https://github.com/ProjetTaskFlow/TaskFlowAPI
cd TaskFlowAPI

# 2. Installer les dependances
npm install

# 3. Configurer l'environnement
cp .env.exemple .env
# Editer .env avec vos identifiants MySQL

# 4. Lancer le serveur de developpement 
npm start
```

L'application sera accessible sur `http://localhost:3000`.

### Variables d'environnement

| Variable         | Description                          | Exemple               |
|------------------|--------------------------------------|-----------------------|
| `FRONTEND_URL`   | URL du front                         | http://localhost:4173 |
| `PORT`           | configuration du serveur             | 3000                  |
| `HOST`           | configuration du serveur             | localhost             |
| `DB_HOST`        | hôte de la base de données           | localhost             |
| `DB_USER`        | utilisateur MySQL                    | root                  |
| `DB_PASSWORD`    | mot de passe de la base de données   | mot_de_passe          |
| `DB_NAME`        | Nom de la base de données            | site_taskflow         |
| `BCRYPT_ROUNDS`  | tours d'hachage mot de passe clients | 10                    |
| `JWT_SECRET`     | clé pour le AuthMiddleware           | ma_clé_secrete        |
| `JWT_EXPIRES_IN` | temps avant l'expirationde la clé    | 1800                  |

## Scripts disponibles

| Commande          | Description                    |
|-------------------|--------------------------------|
| `npm start`       | Lancer le serveur avec Node    |
| `npm run dev`     | Lancer le serveur avec nodemon |
| `npm run lint`    | Lancer ESLint sur le projet    |


## Exemples d'utilisation

| URL                         | Description                          |
|-----------------------------|--------------------------------------|
| `GET /api/utilisateurs`     | Récupérer tous les utilisateurs      |
| `POST /api/login`           | Connexion et création de cookie auth |
| `GET /api/utilisateurs/:id` | Récupérer un utilisateur par son id  |

## Structure du projet

```
apitaskflow/
├── middleware/
│   └── authMiddleware.js      
├── projet/        
│   └── controllers/
│       └── ProjetController.js
│   └── models/
│       └── ProjetModel.js
│   └── routes/
│       └── ProjetRouter.js
├── tache/             
│   └── acontrollers/
│      └── TacheController.js
│   └── models/
│       └── TacheModel.js
│   └── routes/   
│       └── TacheRouter.js
├── utilisateur/ 
│   └── controllers/
│       └── UtilisateurController.js
│   └── models/
│       └── UtilisateurModel.js
│   └── routes/     
│       └── UtilisateurRoutes.js      
├── db.js            
└── server.js 
```

## Deploiement

### Build de production

```bash
npm run build
```

Les fichiers statiques sont générés dans le dossier `dist/`.

### Hebergement

<!-- Decrire la procedure de deploiement (Plesk, o2Switch, etc...) -->


## Tests
<!-- Decrire comment lancer les tests -->

```bash
# Lancer les tests
npm run test
```

## Stack technique

- **Node.js & Express**
- **MySQL2**
- **bcryptjs**
- **cookie-parser**
- **cors**
- **dotenv**
- **jsonwebtoken**
- **morgan**
- **nodemon**
- **prettier**

## Auteurs

- **Mathéo LAGIER** — Développeur
- **Semih SISMAN** — Développeur
- **Samuel AWODUN ARASOMWAN** — Développeur
-
## Licence

Ce projet est sous licence [ISC](LICENSE).

## Liens utiles

- [Documentation React](https://react.dev/)
- [Documentation Vite](https://vite.dev/)