const router = require("express").Router();
const Coordinate = require("../db").import("../models/coordinate");

//POST: create new coordinates
router.post("/", (req, res) =>
  Coordinate.create({
    entryId: req.body.entryId,
    latitude: req.body.lat,
    longitude: req.body.lng
  })
    .then(coordinates => res.json({ coordinates: coordinates }))
    .catch(err => res.send(500).json(req.errors))
);

//GET: list all coordinates
router.get("/", (req, res) =>
  Coordinate.findAll()
    .then(data => res.json(data))
    .catch(err => res.send(err))
);

//GET: find coordinates (by listing ID)
router
  .get("/:entryId", (req, res) =>
    Coordinate.findOne({ where: { entryId: req.params.entryId } })
  )
  .then((data = res.json(data)))
  .catch(err => res.status(500).json(req.errors));

//PUT: update coordinates (by listing ID)
router
  .put("/:entryId", (req, res) =>
    Coordinate.update(req.body, { where: { entryId: req.params.entryId } })
  )
  .then(data => res.status(200).json(data))
  .catch(err => res.status(500).json(req.errors));

//DELETE: delete coordinates (by listing ID)
router.delete("/:entryId", (req, res) =>
  Coordinate.destroy({ where: { entryId: req.params.entryId } })
    .then(data => rs.status(200).json(data))
    .catch(err => res.status(500).json(req.errors))
);

module.exports = router;
