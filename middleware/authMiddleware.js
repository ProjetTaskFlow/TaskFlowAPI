const jwt = require("jsonwebtoken");

// Vérification du token
const verifyToken = (req, res, next) => {
    const token = req.cookies?.token;

    if (!token) {
        return res.status(403).json({
            message: "Token manquant - veuillez vous connecter",
        });
    }

    // Vérifier le token JWT
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            if (err.name === "TokenExpiredError"){
                return res.status(401).json({
                    message: "Token expiré - veuillez vous reconnecter"
                });
            }
            return res.status(401).json({
                message: "Token invalide",
            });
        }

        // Si token valide : on ajoute les infos de l'utilisateur à la requête
        // decoded contient: { id:..., email:... } (c'est défini dans UtilisateurController)
        req.client = decoded;
        // On passe au controller suivant
        next();
    });
};

module.exports = { verifyToken };