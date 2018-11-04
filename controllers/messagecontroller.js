const router = require("express").Router();
const Message = require("../db").import("../models/message");

//GET: count number of unread messages (for notifications)
router.get("/new", (req, res) =>
  Message.count({ where: { status: "new" } })
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json(req.errors))
);

//GET: get all incoming messages
router.get("/inbox", (req, res) =>
  Message.findAll({ where: { recipientId: req.user.id } })
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json(req.errors))
);

//GET: get all sent messages
router.get("/outbox", (req, res) =>
  Message.findAll({ where: { senderId: req.user.id } })
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json(req.errors))
);

//DELETE: delete all messages from self
router.delete("/deleteaccount", (req, res) =>
  Message.destroy({ where: { senderId: req.user.id } })
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json(req.errors))
);

//POST: create new message
router.post("/", (req, res) =>
  Message.create({
    senderId: req.user.id,
    recipientId: req.body.recipientId,
    subject: req.body.subject,
    content: req.body.content,
    status: "new"
  })
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json(req.errors))
);

//PUT: update incoming messages as read
router.put("/", (req, res) =>
  Message.update(
    { status: "read" },
    { where: { recipientId: req.user.id, status: "new" } }
  )
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json(req.errors))
);

//GET: find single message
router.get("/:id", (req, res) =>
  Message.findOne({ where: { id: req.params.id } })
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json(req.errors))
);

//DELETE: delete message
router.delete("/:id", (req, res) =>
  Message.destroy({ where: { id: req.params.id } })
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json(req.errors))
);

module.exports = router;
