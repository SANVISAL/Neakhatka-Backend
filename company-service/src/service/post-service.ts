import {
  postcreateschema,
} from "../database/repository/@types/post.repo.type";
import PostJob from "../database/repository/post.repository";

class PostService {
  private postrepo: PostJob;
  constructor() {
    this.postrepo = new PostJob();
  }
  async Create(postdetail: postcreateschema) {
    try {
      const create = await this.postrepo.Create(postdetail);
      return create;
    } catch (error) {
      console.log(error);
    }
  }
}
export default PostService;

  // async Find_By_Id({ id }: { id: string }) {
  //   try {
  //     return await this.postrepo.Find_By_Id({ id });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  // async Delete({ id }: { id: string }) {
  //   try {
  //     return await this.postrepo.Delete({ id });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // async Update({ id, update }: { id: string; update: postupdateschema }) {
  //   try {
  //     return await this.postrepo.Update({ id, update });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
// }

// export default PostService;
