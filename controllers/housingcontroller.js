const router = require("express").Router();
const Housing = require("../db").import("../models/housing");

//POST: create new entry
router.post("/", (req, res) =>
  Housing.create({
    residenceType: req.body.residenceType,
    rooms: req.body.rooms,
    bathrooms: req.body.bathrooms,
    address: req.body.address,
    petsAllowed: req.body.petsAllowed,
    facilities: req.body.facilities,
    price: req.body.price,
    owner: req.user.id
  })
    .then(housing => res.json({ housing: housing }))
    .catch(err => res.send(500).json(req.errors))
);

//GET: list all entries
router.get("/", (req, res) =>
  Housing.findAll()
    .then(data => res.json(data))
    .catch(err => res.send(err))
);

//GET: find single entry
router.get("/:id", (req, res) =>
  Housing.findOne({ where: { id: req.params.id } })
    .then(data => res.json(data))
    .catch(err => res.status(500).json(req.errors))
);

//GET: find all entries (for self)
router.get("/owner/", (req, res) =>
  Housing.findAll({ where: { owner: req.user.id } })
    .then(data => res.json(data))
    .catch(err => res.status(500).json(req.errors))
);

//PUT: update entry
router.put("/:id", (req, res) =>
  Housing.update(req.body, { where: { id: req.params.id } })
    .then(data => res.status(200).json(data))
    .catch(err => res.send(500).json(req.errors))
);

//DELETE: delete entry
router.delete("/:id", (req, res) =>
  Housing.destroy({ where: { id: req.params.id } })
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json(req.errors))
);

module.exports = router;
