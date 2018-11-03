const router = require("express").Router();
const User = require("../db").import("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validateSession = require("../middleware/validate-session");

//POST: Create new user
router.post("/signup", (req, res) => {
  User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    permission: req.body.permission,
    passwordhash: bcrypt.hashSync(req.body.password, 10)
  }).then(
    (createSuccess = user => {
      let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 24
      });

      res.json({
        user: user,
        message: "created",
        sessionToken: token
      });
    }),
    (createError = err => res.send(500, err.message))
  );
});

//POST: Log in as existing user
router.post("/login", (req, res) => {
  User.findOne({ where: { email: req.body.email } }).then(
    user => {
      if (user) {
        bcrypt.compare(req.body.password, user.passwordhash, (err, matches) => {
          if (matches) {
            let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
              expiresIn: 60 * 60 * 24
            });
            res.json({
              user: user,
              message: "successfully authenticated",
              sessionToken: token
            });
          } else {
            res.status(502).send({ error: "unable to authenticate" });
          }
        });
      } else {
        res.status(500).send({ error: "unable to authenticate" });
      }
    },
    err => res.status(501).send({ error: "unable to authenticate)" })
  );
});

//GET: find self
router.get("/", validateSession, (req, res) =>
  User.findOne({ where: { id: req.user.id } })
    .then(data => res.json(data))
    .catch(err => res.status(500).json(req.errors))
);

//DELETE: delete all coordinates from self (for deleting user)
router.delete("/deleteaccount", (req, res) =>
  User.destroy({ where: { id: req.user.id } })
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json(req.errors))
);

//GET: find user by id
router.get("/:id", validateSession, (req, res) =>
  User.findOne({ where: { id: req.params.id } })
    .then(data => res.json(data))
    .catch(err => res.status(500).json(req.errors))
);

//PUT: update a user
router.put("/:id", validateSession, (req, res) =>
  User.update(req.body, { where: { id: req.params.id } })
    .then(data => res.status(200).json(data))
    .catch(err => res.send(500).json(req.errors))
);

//DELETE: delete a user
router.delete("/:id", validateSession, (req, res) =>
  User.destroy({ where: { id: req.params.id } })
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json(req.errors))
);

module.exports = router;
