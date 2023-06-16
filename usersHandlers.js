const database = require("./database");

const updateUsers = (req, res) => {
  const idz = parseInt(req.params.id);
  const { id, firstname, lastname, email, city } = req.body;

  database
    .query(
      "update users set id = ?, firstname = ?, lastname = ?, email = ?, city = ?",
      [id, firstname, lastname, email, city]
    )
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(404).send("Not Found");
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error editing the user");
    });
};

const deleteUsers = (req, res) => {
  const idz = parseInt(req.params.id);

  database
    .query("delete from users where id = ?", [idz])
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(404).send("Not Found");
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error deleting the user");
    });
};

const postUsers = (req, res) => {
  const { id, firstname, lastname, email, city } = req.body;
  database
    .query(
      "INSERT INTO users(id, firstname, lastname, email, city) VALUES (?, ?, ?, ?, ?)",
      [id, firstname, lastname, email, city]
    )
    .then(([result]) => {
      res.location(`/api/users/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error saving the movie");
    });
};

const getUsers = (req, res) => {
  database
    .query("select * from users")
    .then(([user]) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const getUsersById = (req, res) => {
  const idz = parseInt(req.params.id);

  database
    .query("select * from users where id = ?", [idz])
    .then(([user]) => {
      if (user[0] != null) {
        res.json(user[0]);
      } else {
        res.status(404).send("Not Found");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

module.exports = {
  getUsers,
  getUsersById,
  postUsers, // don't forget to export your function ;)
  updateUsers,
  deleteUsers,
};
