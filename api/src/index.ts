import config from "config";
import { httpServer, httpsServer } from "./app";
import logger from "./utilities/loggers/winston";

const HTTP_PORT = process.env.HTTP_PORT || config.get("app.http_port");
const HTTPS_PORT = process.env.HTTPS_PORT || config.get("app.https_port");

if (config.get("app.build") === "production")
  httpsServer.listen(HTTPS_PORT, () => {
    logger.info(`${config.get("name")} Running on port ${HTTPS_PORT}`);
  });
else
  httpServer.listen(HTTP_PORT, () => {
    logger.info(`${config.get("name")} Running on port ${HTTP_PORT}`);
  });
