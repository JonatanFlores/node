const crypto = require("crypto");
const { knex, User } = require("../models");
const truncate = require("../utils/truncate");

beforeEach(async () => await truncate());

describe("User", () => {
  it("should encrypt user password", async () => {
    const rawPassword = "123456";
    const user = await User.query().insert({
      email: "jonatafloress@gmail.com",
      password: rawPassword
    });

    const passwordHashed = crypto
      .createHash("md5")
      .update(rawPassword)
      .digest("hex");

    expect(user.password).toBe(passwordHashed);
  });
});

afterAll(() => knex.destroy());
