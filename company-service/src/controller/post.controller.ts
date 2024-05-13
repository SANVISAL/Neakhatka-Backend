import { Body, Post, Route, SuccessResponse } from "tsoa";
// import { postcreateschema } from "../database/repository/@types/post.repo.type";
import PostService from "../service/post-service";
import { StatusCode } from "../util/consts/status.code";
import { IpostDocument } from "../database/@types/post-interface";

@Route("v1/company")
class PostController {
  @SuccessResponse(StatusCode.Created)
  @Post(ROUTE_PATHS.COMPANY.POST)
  public async Create(@Body() requertBody: IpostDocument) {
    try {
      const postservice = new PostService();
      const result = await postservice.Create(requertBody);
      return result;
    } catch (error) {
      console.log(error);
    }
  }
}

export default PostController;
