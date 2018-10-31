const router = require("express").Router();
const Coords = require("../db").import("../models/coords");

//POST: create new coordinates
router.post("/", (req, res) =>
  Coords.create({
    entryId: req.body.entryId,
    latitude: req.body.lat,
    longitude: req.body.lng
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

//GET: find coordinates (by listing ID)
router.get("/:entryId", (req, res) =>
  Coords.findOne({ where: { entryId: req.params.entryId } })
    .then(data => res.json(data))
    .catch(err => res.status(500).json(req.errors))
);
//PUT: update coordinates (by listing ID)
router.put("/:entryId", (req, res) =>
  Coords.update(req.body, { where: { entryId: req.params.entryId } })
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json(req.errors))
);

//DELETE: delete coordinates (by listing ID)
router.delete("/:entryId", (req, res) =>
  Coords.destroy({ where: { entryId: req.params.entryId } })
    .then(data => rs.status(200).json(data))
    .catch(err => res.status(500).json(req.errors))
);

module.exports = router;
