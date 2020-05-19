import { getManager } from "typeorm";

import { Post } from "../models/post";

class PostRepository {
  public async criarPost(post: Post): Promise<Post> {
    const posts = await getManager().getRepository(Post).create(post);

    return await getManager().getRepository(Post).save(posts);
  }

  public async listarPosts(): Promise<Post[]> {
    return await getManager().getRepository(Post).find();
  }

  public async pegarPostPorId(postID: string): Promise<Post> {
    return await getManager()
      .getRepository(Post)
      .findOne({
        where: {
          id: postID,
        },
      });
  }

  public async salvarLikes(postID: string, newLikes: number): Promise<void> {
    await getManager()
      .getRepository(Post)
      .update({ id: postID }, { likes: newLikes });
  }
}

export default new PostRepository();
