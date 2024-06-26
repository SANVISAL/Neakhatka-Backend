
import { StatusCode } from "../utils/consts"
import { SerializedErrorOutput } from "./@types/serialized-error-output"
import BaseCustomError from "./base-custom-error"


export default class DubplicateError extends BaseCustomError{
    constructor (message : string){
        super(message, StatusCode.Conflict)
        Object.setPrototypeOf(this , DubplicateError.prototype)
    
    }
    getStatusCode(): number {
        return this.statusCode;
    }
    serializeErrorOutput(): SerializedErrorOutput {
        return {errors:[{message : this.message}]}
    }
}