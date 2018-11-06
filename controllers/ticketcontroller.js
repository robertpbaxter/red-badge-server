const router = require("express").Router();
const Ticket = require("../db").import("../models/ticket");

//POST: create new ticket
router.post("/", (req, res) =>
  Ticket.create({
    type: req.body.type,
    issue: req.body.issue,
    content: req.body.content,
    status: req.body.status,
    contactId: req.user.id
  })
    .then(ticket => res.json({ ticket: ticket }))
    .catch(err => res.send(500).json(req.errors))
);

//GET: list all tickets
router.get("/", (req, res) =>
  Ticket.findAll()
    .then(data => res.json(data))
    .catch(err => res.send(err))
);

//GET: list ACTIVE tickets
router.get("/active", (req, res) =>
  Ticket.findAll({ where: { status: ["new", "pending"] } })
    .then(data => res.json(data))
    .catch(err => res.send(err))
);

//DELETE: delete all tickets from self
router.delete("/deleteaccount", (req, res) =>
  Ticket.destroy({ where: { owner: req.user.id } })
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json(req.errors))
);

//GET: find single ticket
router.get("/:id", (req, res) =>
  Ticket.findOne({ where: { id: req.params.id } })
    .then(data => res.json(data))
    .catch(err => res.status(500).json(req.errors))
);

//PUT: update ticket
router.put("/:id", (req, res) =>
  Ticket.update(req.body, { where: { id: req.params.id } })
    .then(data => res.status(200).json(data))
    .catch(err => res.send(500).json(req.errors))
);

//DELETE: delete ticket
router.delete("/:id", (req, res) =>
  Ticket.destroy({ where: { id: req.params.id } })
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json(req.errors))
);

module.exports = router;
