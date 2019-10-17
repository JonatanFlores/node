const crypto = require("crypto");
const { Model } = require("objection");

class User extends Model {
  static get tableName() {
    return "user";
  }

  async $beforeInsert(queryContext) {
    await super.$beforeInsert(queryContext);

    this.password = crypto
      .createHash("md5")
      .update(this.password)
      .digest("hex");
  }
}

module.exports = User;
