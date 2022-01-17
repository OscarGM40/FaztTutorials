import dotenv from 'dotenv';
dotenv.config(); 

import { app } from "./app";
import { connectDB } from './db';


/*  */
(async function main(){
  try {
    await connectDB();
    app.listen(process.env.PORT || 3000, () => {
      console.clear();
      console.log('Listening on port 3000');
    });
  }catch (error){
    console.log(error);
  }
})();


