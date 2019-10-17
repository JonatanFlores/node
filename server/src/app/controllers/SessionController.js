class SessionController {
  async store(req, res) {
    try {
      const { User } = req.models;
      const { email, password } = req.body;
      const user = await User.query().findOne({ email });

      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      if (!user.checkPassword(password)) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      res.status(200).json({
        name: user.name,
        email: user.email,
        token: user.generateToken()
      });
    } catch (err) {
      return res.sendStatus(500);
    }
  }
}

module.exports = new SessionController();
