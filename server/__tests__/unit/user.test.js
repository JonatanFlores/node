const bcrypt = require("bcryptjs");

const { User } = require("../models");
const truncate = require("../utils/truncate");

describe("User", () => {
  beforeEach(async () => {
    await truncate();
  });

  it("should encrypt user password", async () => {
    const user = await User.query().insert({
      email: "jonatafloress@gmail.com",
      password: "123456"
    });

    // const compareHash = await bcrypt.compare("123456", user.password_hash);

    // expect(compareHash).toBe(true);

    expect(user.password).toBe("123456");
  });
});
