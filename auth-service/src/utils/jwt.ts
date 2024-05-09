import bcrypt from "bcrypt";
import { privatekey } from "../server";
import jwt from "jsonwebtoken";
import getConfig from "./config";
export const generatePassword = async (password: string) => {
  try {
    const salt = 10;
    return await bcrypt.hash(password, salt);
  } catch (error) {
    console.log(error);
  }
};

export const ValidatePassword = async(
  {
   enterpassword,
   savedPassword
  }:{
  enterpassword:string,
  savedPassword:string})=>{
    return (await generatePassword(enterpassword)) === savedPassword;
  }

export const generateSignature = async(payload: object):Promise<string>=>{
  try{
    return await jwt.sign(payload,privatekey,{
      expiresIn: parseInt(getConfig().jwtExpiresIn!),
      algorithm:"RS256"
    })
  }catch(error){
    console.log(error)
    return "error on signature"
  }
}