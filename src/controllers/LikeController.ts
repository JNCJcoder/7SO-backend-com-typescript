import type { Response } from "express";

import type { RequestCustom as Request } from "../interfaces/ioExtend";
import PostRepository from "../repository/PostRepository";

class LikeController {
  public async store(req: Request, res: Response): Promise<Response> {
    const post = await PostRepository.pegarPostPorId(req.params.id);

    post.likes += 1;

    await PostRepository.salvarLikes(req.params.id, post.likes);

    req.io.emit("like", post);

    return res.status(200).json(post);
  }
}

export default new LikeController();
