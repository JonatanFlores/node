const router = require("express").Router();
const authMiddleware = require("./app/middlewares/auth");
const SessionsController = require("./app/controllers/SessionController");

router.post("/users", SessionsController.create);
router.post("/sessions", SessionsController.store);
router.get("/dashboard", authMiddleware, (req, res) => {
  res.sendStatus(200);
});

module.exports = router;
