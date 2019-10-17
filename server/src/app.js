const fs = require("fs");
const path = require("path");
const express = require("express");
const Knex = require("knex");
const tenants = require(`./config/tenants.js`);

class Application {
  constructor() {
    this.express = express();

    this.database();
    this.middlewares();
    this.routes();
  }

  database() {
    this.express.use((req, res, next) => {
      const knexCache = new Map();
      const knex = getKnexForRequest(req, knexCache);
      const models = {};

      if (knex) {
        fs.readdirSync(path.join(__dirname, "./app/models/"))
          .filter(file => {
            return file.indexOf(".") !== 0 && file.slice(-3) === ".js";
          })
          .forEach(file => {
            const modelClass = file.replace(".js", "");
            const model = require(`./app/models/${modelClass}`);
            models[modelClass] = model.bindKnex(knex);
          });
      }

      req.models = models;

      next();
    });

    function getKnexForRequest(req, knexCache) {
      // If you pass the tenantIs a query parameter, you
      // would do something like this.
      let tenantId = req.query.tenantId;

      if (tenantId) {
        let knex = knexCache.get(tenantId);

        if (!knex) {
          knex = Knex(knexConfigForTenant(tenantId));
          knexCache.set(tenantId, knex);
        }

        return knex;
      }
    }

    // The correct knex config object for the given tenant.
    function knexConfigForTenant(tenantId) {
      const { shared } = tenants;
      const { datasource } = tenants[tenantId];

      const connection = {
        ...datasource.connection,
        ...shared.datasource.connection
      };

      const credentials = {
        ...shared.datasource,
        ...datasource,
        connection
      };

      return credentials;
    }
  }

  middlewares() {
    this.express.use(express.json());
  }

  routes() {
    this.express.use(require("./routes"));
  }
}

module.exports = new Application().express;
