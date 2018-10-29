const router = require("express").Router();
const Ticket = require("../db").import("../models/ticket");

//POST: create new ticket
router.post("/", (req, res) =>
  Ticket.create({
    type: req.body.ticket.type,
    issue: req.body.ticket.issue,
    content: req.body.ticket.content,
    status: req.body.ticket.status,
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

//GET: find single ticket
router.get("/:id", (req, res) =>
  Ticket.findOne({ where: { id: req.params.id } })
    .then(data => res.json(data))
    .catch(err => res.status(500).json(req.errors))
);

//PUT: update ticket
router.put("/:id", (req, res) =>
  Ticket.update(req.body.ticket, { where: { id: req.params.id } })
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
