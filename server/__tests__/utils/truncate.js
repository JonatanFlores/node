const models = require("../models");
const excludes = ["knex"];

module.exports = () => {
  return Promise.all(
    Object.keys(models).map(key => {
      if (!excludes.includes(key)) {
        const model = models[key];
        return model.query().truncate();
      }
    })
  );
};
