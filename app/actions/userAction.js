'use server'

import { connectDB } from "@/lib/connectDB"
import z from "zod"
import bcrypt from "bcrypt"
import { User } from "@/models/UserModel"
import { registerSchema } from "@/lib/Schema/userSchema"

 
export async function registerUser(_, formData) {
  const {success, data, error} = registerSchema.safeParse(formData)

  if(!success){
    console.log({errors : z.flattenError(error).fieldErrors})
    return {success : false, errors : z.flattenError(error).fieldErrors}
  }

  await connectDB()
  try {
    const {fullname, email, password} = data;
    const hashedPassword =  await bcrypt.hash(password, 10)
    const createUser = await User.create({fullname, email, password : hashedPassword})

    return {success : true, message : "User created sucessfully"}
    
  } catch (err) {
    if (err.code === 11000) {
      return {
        errors: {
          email: "Email already exists",
        },
      };
    } else {
      return {
        errors: {
          name: "Something went wrong.",
        },
      };
    }
  }
}