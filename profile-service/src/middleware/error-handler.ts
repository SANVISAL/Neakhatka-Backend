import { Request,Response,NextFunction } from "express";
import BaseCustomError from "../utils/base-custom-error";
import { StatusCode } from "../utils/consts/status.code";

const errorHandler=(
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
):Response=>{
   if(err instanceof BaseCustomError){
    return res.status(err.getStatusCode()).json(err.serializeErrorOutput())
   }
   return res .status(StatusCode.InternalServerError)
   .json({errors:[{message: "Anunexpected error occurred"}]})
}

export default errorHandler;