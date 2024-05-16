import { Post } from "../model/post.repo.model";
import { postcreateschema } from "./@types/post.repo.type";
// import { postcreateschema, postupdateschema } from "./@types/post.repo.type";

class PostJob {
  async Create(postdetail:postcreateschema ) {
    try {
      const create = new Post(postdetail);
      return create;
    } catch (error) {
      console.log(error);
    }
  }
}

export default PostJob
  // async Find_By_Id({ id }: { id: string }) {
  //   try {
  //     const existed = await Post.findById(id);
  //     return existed;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  // async Delete({ id }: { id: string }) {
  //   try {
  //     const existed = await this.Find_By_Id({ id });
  //     if (!existed) {
  //       console.log("Unable to delete this post");
  //     }
  //     const deletepost = await Post.findByIdAndDelete(id);
  //     return deletepost;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // async Update({ id, update }: { id: string; update: postupdateschema }) {
  //   try {
  //     const existed = await this.Find_By_Id({ id });
  //     if (!existed) {
  //       console.log("Unable to Update this post");
  //     }
  //     const Update = await Post.findByIdAndUpdate(id, update, { new: true });
  //     return Update;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
// }
// export default PostJob;
