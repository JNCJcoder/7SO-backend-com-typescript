import { createConnection } from "typeorm";
import express from "express";
import type { Response, NextFunction } from "express";
import type { RequestCustom as Request } from "./interfaces/ioExtend";
import cors from "cors";
import * as socketio from "socket.io";
import * as path from "path";
import * as http from "http";
import routes from "./routes";

class App {
  private express: express.Application;
  private io: SocketIO.Server;
  public server: http.Server;

  public constructor() {
    this.express = express();
    this.server = require("http").Server(this.express);
    this.io = socketio.listen(this.server, { origins: "*:*" });

    this.middlewares();
    this.database();
    this.route();
  }

  private middlewares(): void {
    this.express.use(express.json());
    this.express.use(cors());
    this.express.use(
      "/files",
      express.static(path.resolve(__dirname, "..", "uploads", "resized"))
    );
    this.express.use((req: Request, res: Response, next: NextFunction) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
      res.header("Access-Control-Allow-Headers", "X-Requested-With");

      req.io = this.io;

      next();
    });
  }

  private database(): void {
    createConnection()
      .then(() => {
        console.log(
          "\x1b[32m[ BANCO DE DADOS ] \x1b[0mBanco de dados conectado"
        );
      })
      .catch((error) =>
        console.log(
          "\x1b[31m[ BANCO DE DADOS ] \x1b[0mErro na conexao ao Banco de dados: ",
          error
        )
      );
  }

  private route(): void {
    this.express.use(routes);
  }
}

export default new App().server;
