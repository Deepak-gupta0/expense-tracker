import mongoose from "mongoose";

const DB_URI = process.env.DB_URL;

export async function connectDB() {
  try {
    if(mongoose.connection.readyState === 1){
      console.log("Already Connected")
      return
    }
    await mongoose.connect(DB_URI, {
      dbName : "ExpenseApp"
    })
    console.log("Database Sucessfully Connected")
    
  } catch (error) {
    console.log(error)
    console.log("Database not connected")
    process.exit(1)
  } 
}
