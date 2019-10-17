const router = require("express").Router();
const SessionsController = require("./app/controllers/SessionController");

router.get("/sessions", SessionsController.store);

module.exports = router;
