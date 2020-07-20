import type { Request } from "express";
import type SocketIO from "socket.io";
interface RequestCustom extends Request {
  io?: SocketIO.Server;
}
export type { RequestCustom };
