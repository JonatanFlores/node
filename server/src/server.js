const logger = require("./logger");
const app = require("./app");
const port = process.env.PORT || 3000;
const server = app.listen(port);

process.on("unhandledRejection", (reason, p) =>
  logger.error("Unhandled Rejection at: Promise ", p, reason)
);

server.on("listening", () => logger.info("Server started on port: %s", port));
