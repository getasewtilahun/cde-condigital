import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import moment from "moment";
import compression from "compression";
import express, { Application, Request, Response } from "express";
import passport from "passport";
import https from "https";
import http from "http";
import routes from "./routers";
import { Messages } from "./errors/Messages";
import initializeDB from "./utilities/database/sequelize";
import passportConfig from "./utilities/passport/passport";
import config from "config";
import fs from "fs";
import logger from "./utilities/loggers/winston";
import { initNotificationBot } from "./utilities/TelegramBot/notification.util";
import Jobs from "./jobs";
import dotenv from "dotenv";
import { Server as SocketServer } from "socket.io";
import jsonwebtoken from "jsonwebtoken";
import { Error, UnauthorizedError } from "./errors/Errors";
import { CommunicationSocketEvents } from "./constants/constants";

dotenv.config();

/**
 * Initialize Express App
 */
const app: Application = express();
let httpsServer: any;
const httpServer = http.createServer(app);

/**
 * Passport configuration
 */
app.use(
  require("express-session")({
    secret: "condigital-phison-key",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(passportConfig.localStrategy);
passport.use(passportConfig.jwtStrategy);

passport.serializeUser(function (user: any, done: Function) {
  done(null, user);
});
passport.deserializeUser(function (user: any, done) {
  done(null, user);
});

/**
 * Middleware
 */
app.use(compression());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(cors());
app.use(morgan("combined"));
app.use("/uploads", express.static("uploads"));
app.use("/public", express.static("public"));

/**
 * Initialize Database
 */
initializeDB();

/**
 * Initialize Notification Telegram Bot
 */
initNotificationBot();

/**
 * Initialize Routes
 */
routes(app);

/**
 * Initialize Jobs
 */
Jobs();

/**
 * Global Error Handler
 */
app.use((error: any, request: Request, response: Response, next: Function) => {
  if (error instanceof Error) {
    console.log(error);
    logger.error(`Error: ${error}`);
    response.status(error.statusCode || 500).json(error.payload || {
      timestamp: moment(),
      errors: [Messages.INTERNAL_SERVER_ERROR],
    });
  } else {
    console.log(error);
    logger.error(`Error: ${error}`);
    response.status(500).json({
      timestamp: moment(),
      errors: [Messages.INTERNAL_SERVER_ERROR],
    });
  }
});

/**
 * HTTPS Configuration
 */
if (config.get("app.build") !== "development") {
  const privateKey = fs.readFileSync(`/etc/letsencrypt/live/${config.get("app.url")}/privkey.pem`, "utf8");
  const certificate = fs.readFileSync(`/etc/letsencrypt/live/${config.get("app.url")}/cert.pem`, "utf8");
  const ca = fs.readFileSync(`/etc/letsencrypt/live/${config.get("app.url")}/chain.pem`, "utf8");
  const credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca,
  };
  httpsServer = https.createServer(credentials, app);
}

/**
 * Initialize Socket Server
 */
const socketIo = new SocketServer(
  config.get("app.build") === "development" ? httpServer : httpsServer,
  { cors: { origin: "*" } }
);

socketIo.use((socket, next) => {
  if (socket.handshake.auth?.token) {
    jsonwebtoken.verify(
      socket.handshake.auth?.token,
      passportConfig.security.secret,
      (error: any) => {
        if (error) return next(new UnauthorizedError().payload);
        next();
      }
    );
  } else {
    next(new UnauthorizedError().payload);
  }
});

socketIo.on("connection", (socket) => {
  console.log(`++++++ [Client ${socket.id} connected]`);

  socket.on("sendMessage", (message) => {
    socket.broadcast.emit("receiveMessage", message);
  });

  socket.on(CommunicationSocketEvents.JOIN_ROOMS, (rooms: string[] | string) => {
    console.log(`>>>>>> [Client ${socket.id} connected to room]`, rooms);
    socket.join(rooms);
  });

  socket.on(CommunicationSocketEvents.LEAVE_ROOM, (room: string) => {
    console.log(`<<<<<<< [Client ${socket.id} disconnected from room]`, room);
    socket.leave(room);
  });

  socket.on("disconnect", () => {
    console.log(`----- [Client ${socket.id} disconnected]`);
  });
});

export { httpServer, httpsServer, socketIo };
