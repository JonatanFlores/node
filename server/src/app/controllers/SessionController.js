class SessionController {
  async store(req, res) {
    try {
      const { User } = req.models;
      const user = await User.query().insert({
        email: "janedoe@gmail.com",
        senha: "4321"
      });
      return res.json({ message: "/sessions route works", user });
    } catch (err) {
      console.log(err);
      return res.sendStatus(500);
    }
  }
}

module.exports = new SessionController();
