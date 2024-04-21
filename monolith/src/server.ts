import app from "../src/app"
import { connectMongoDB } from "./database/ConnectToMongoDBServer";
// import { connectToDatabasesignup } from "./utils/connectToDB";

const port = 5000;

connectMongoDB()

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  
export {app }; // Export the app for calling and running it in app.js
