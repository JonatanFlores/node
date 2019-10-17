const path = require("path");
const fs = require("fs");
const { Model } = require("objection");
const Knex = require("knex");
const knexfile = require("../knexfile");
const env = process.env.NODE_ENV;
const config = knexfile[env];
const knex = Knex(config);
const models = {};

if (knex) {
  Model.knex(knex);

  fs.readdirSync(path.join(__dirname, "../src/app/models/"))
    .filter(file => {
      return file.indexOf(".") !== 0 && file.slice(-3) === ".js";
    })
    .forEach(file => {
      const modelClass = file.replace(".js", "");
      const model = require(`../src/app/models/${modelClass}`);
      models[modelClass] = model.bindKnex(knex);
    });
}

module.exports = models;
