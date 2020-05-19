import type { Response } from "express";
import { v1 as uuidv1 } from "uuid";
import sharp from "sharp";
import path from "path";
import fs from "fs";

import { Post } from "../models/post";
import PostRepository from "../repository/PostRepository";
import type { RequestCustom as Request } from "../interfaces/ioExtend";

class PostController {
  public async index(req: Request, res: Response): Promise<Response> {
    try {
      const posts = await PostRepository.listarPosts();

      return res.json(posts);
    } catch (err) {
      return res.send(err);
    }
  }

  public async store(req: Request, res: Response): Promise<Response> {
    try {
      const { author, place, descriptions, hashtags } = req.body;

      const randomName: string = uuidv1();
      const filename: string = `${randomName}.jpg`;

      await sharp(req.file.path)
        .resize(500)
        .jpeg({ quality: 70 })
        .toFile(path.resolve(req.file.destination, "resized", filename));

      fs.unlinkSync(req.file.path);
      //@ts-ignore
      const postBody: Post = {
        author,
        place,
        descriptions,
        hashtags,
        image: filename,
        likes: 0,
      };

      const post = await PostRepository.criarPost(postBody);

      req.io.emit("post", post);

      return res.status(200).json(post);
    } catch (err) {
      console.log(err);
      return res.send(err);
    }
  }
}

export default new PostController();
