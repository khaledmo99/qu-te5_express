const bodyParser = require("body-parser");
const validateMovie = (req, res, next) => {
  // Vérifiez les conditions de validation du film ici
  // Exemple : Vérification que le titre et la durée sont fournis
  if (!req.body.title || !req.body.duration) {
    res.status(422).json({ message: "Invalid movie data" });
  } else {
    next();
  }
};

// Middleware pour valider les données d'un utilisateur
const validateUser = (req, res, next) => {
  // Vérifiez les conditions de validation de l'utilisateur ici
  // Exemple : Vérification que le nom d'utilisateur et l'e-mail sont fournis
  if (!req.body.username || !req.body.email) {
    res.status(422).json({ message: "Invalid user data" });
  } else {
    next();
  }
};

module.exports = {
  validateMovie,
  validateUser,
};
