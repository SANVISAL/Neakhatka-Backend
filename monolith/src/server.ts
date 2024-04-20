import app from "../src/app"
// import app from "./app";
import { conectmongooDB } from "./utils/ConnnectToDB";
// import { connectToDatabasesignup } from "./utils/connectToDB";

const port = 5000;

conectmongooDB()

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  
export {app }; // Export the app for calling and running it in app.js
