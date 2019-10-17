const faker = require("faker");
const { factory } = require("factory-girl");
const ObjectionAdapter = require("factory-girl-objection-adapter");
const { User } = require("./models");

factory.setAdapter(new ObjectionAdapter());

factory.define("User", User, {
  email: faker.internet.email(),
  password: faker.internet.password()
});

module.exports = factory;
