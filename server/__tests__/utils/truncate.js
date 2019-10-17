const models = require("../models");

module.exports = () => {
  return Promise.all(
    Object.keys(models).map(key => {
      const model = models[key];
      return model.query().truncate();
    })
  );
};
