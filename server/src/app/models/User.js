const crypto = require("crypto");
const { Model } = require("objection");
const jwt = require("jsonwebtoken");
const config = require("../../config/config");

class User extends Model {
  static get tableName() {
    return "user";
  }

  async $beforeInsert(queryContext) {
    await super.$beforeInsert(queryContext);
    this.password = this.generateHash(this.password);
  }

  generateHash(text) {
    return crypto
      .createHash("md5")
      .update(text.toString())
      .digest("hex");
  }

  checkPassword(password) {
    const hashedPassword = this.generateHash(password);
    return this.password === hashedPassword;
  }

  generateToken() {
    return jwt.sign({ id: this.id }, config.jwtSecret);
  }
}

module.exports = User;
