const express = require("express");
const router = express.Router();

// Routes à compléter plus tard
router.get("/", (req, res) => {
    res.json({ message: "Routes projets à venir" });
});

module.exports = router;