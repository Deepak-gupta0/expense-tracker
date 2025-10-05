import { encryptCookie } from "@/lib/auth"
import { connectDB } from "@/lib/connectDB"
import { Session } from "@/models/SessionModel"
import { User } from "@/models/UserModel"
import { cookies } from "next/headers"
import bcrypt from "bcrypt"

export async function POST(request) {
  await connectDB()
  const cookieStore = await cookies()

  const {email, password} = await request.json()

  try{
    const user = await User.findOne({email})

    if(!user){
    return Response.json({error : "Invalid Credential"}, {
      status : 401,
    })
  }
    
  const isValidPassword = await bcrypt.compare(password, user.password)

  if(!isValidPassword){
    return Response.json({error : "Invalid Credential"}, {
      status : 401,
    })
  }

  const session = await Session.create({userId : user.id})
  
  cookieStore.set( {
    name : "sid",
    value : encryptCookie(session.id),
    httpOnly : true,
  })
  
  return Response.json(
  { message: "Login successful" },
  { status: 200 }
);

  }catch (err) {
    console.log(err);
    if (err.code === 11000) {
      return Response.json(
        { error: "Email already exists" },
        {
          status: 409,
        }
      );
    } else {
      return Response.json(
        { error: "Something went wrong" },
        {
          status: 500,
        }
      );
    }
  }
}
