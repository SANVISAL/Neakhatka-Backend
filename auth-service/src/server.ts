import app from "../src/app"
import { Channel } from "amqplib";
import { connectMongoDB } from "./utils/connectDB";
// import { connectToDatabasesignup } from "./utils/connectToDB";
import fs from 'fs';
import  path  from "path";
// import getConfig from "./utils/config";
import { createQuesueConnection } from "./queues/connection";
const port = 5000;
export let authChannel :Channel;
export const privatekey = fs.readFileSync(path.join(__dirname,"../private_key.pem"))


async function run (){
  try{
    // const congig = getConfig(process.env.NODE_ENV)
    authChannel = (await createQuesueConnection())as Channel;
    connectMongoDB()

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
      });
  }catch(error){
    console.log(error)
  }

}  
run();
export {app }; // Export the app for calling and running it in app.js
