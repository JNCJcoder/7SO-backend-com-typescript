import { Router } from "express";
import type { Request, Response } from "express";

import upload from "./config/upload";
import PostController from "./controllers/PostController";
import LikeController from "./controllers/LikeController";

const routes = Router();

routes.get("/", (req: Request, res: Response) =>
  res.send(`Hello ${req.query.name}`)
);

routes.get("/posts", PostController.index);
routes.post("/posts", upload.single("image"), PostController.store);

routes.post("/posts/:id/like", LikeController.store);

export default routes;
