const router = require("express").Router();
const Coords = require("../db").import("../models/coords");

//POST: create new coordinates
router.post("/", (req, res) =>
  Coords.create({
    housingId: req.body.housingId,
    latitude: req.body.lat,
    longitude: req.body.lng,
    owner: req.user.id
  })
    .then(coords => res.json({ coords: coords }))
    .catch(err => res.send(500).json(req.errors))
);

//GET: list all coordinates
router.get("/", (req, res) =>
  Coords.findAll()
    .then(data => res.json(data))
    .catch(err => res.send(err))
);

//GET: find coordinates (by owner)
router.get("/owner", (req, res) =>
  Coords.findAll({ where: { owner: req.user.id } })
    .then(data => res.json(data))
    .catch(err => res.status(500).json(req.errors))
);

//DELETE: delete all coordinates from self (for deleting user)
router.delete("/deleteaccount", (req, res) =>
  Coords.destroy({ where: { owner: req.user.id }, truncate: true })
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json(req.errors))
);

//GET: find coordinates (by listing ID)
router.get("/:id", (req, res) =>
  Coords.findOne({ where: { housingId: req.params.id } })
    .then(data => res.json(data))
    .catch(err => res.status(500).json(req.errors))
);

//PUT: update coordinates (by listing ID)
router.put("/:id", (req, res) =>
  Coords.update(req.body, { where: { housingId: req.params.id } })
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json(req.errors))
);

//DELETE: delete coordinates (by listing ID)
router.delete("/:id", (req, res) =>
  Coords.destroy({ where: { housingId: req.params.id } })
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json(req.errors))
);

module.exports = router;
