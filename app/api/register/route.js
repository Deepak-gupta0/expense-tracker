import { connectDB } from "@/lib/connectDB";
import { User } from "@/models/UserModel";
import bcrypt from "bcrypt"

export async function POST(request) {
  await connectDB()
  const user = await request.json()

  try {
    const {fullname, email, password} = user
    const hashedPassword = await bcrypt.hash(password, 10)
    const createUser = await User.create({fullname, email, password : hashedPassword})

  if(!createUser){
    return Response.json({error : "User Not Created"}, {
      status : 500,
    })
  }

  return Response.json({sucess : "User created"}, {
    status : 201,
  })

  } catch (error) {
    if(error.code === 11000){
      return Response.json({error : "Email already exists"}, {
        status : 409,
      })
    }else{
      return Response.json({error : "Something went wrong"}, {
        status : 500,
      })
    }
  }

}

