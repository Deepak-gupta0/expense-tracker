import { Session } from "@/models/SessionModel";
import { User } from "@/models/UserModel";
import { createHmac } from "crypto";
import { cookies } from "next/headers";

export async function getAuthUser() {

  const cookieStore = await cookies();

  const errorResponse = Response.json({
    error: "Please login.",
  }, {status : 401});

  const cookie = cookieStore.get("sid")?.value;
  
  if (!cookie) {
    return errorResponse;
  }

  const sessionId = decryptCookie(cookie)

  if (!sessionId) {
    return errorResponse;
  }
  const session = await Session.findById(sessionId)

  if (!session) {
    return Response.json({
    error: "Session Id doesn't exists in database.",
  }, {status : 401});;
  }

  const user = await User.findById(session.userId);

  if (!user) {
    return errorResponse;
  }
  const {fullname, email, _id} = user;

  return {fullname, email, id:_id};
}

export function encryptCookie(cookie) {
  const signed = createHmac("sha256", process.env.COOKIE_PROTECT).update(cookie).digest("hex")

  return `${cookie}.${signed}`
}

export function decryptCookie(encryptedCookie) {
 const [cookie, signedCookie] = encryptedCookie.split(".")

 const signed = encryptCookie(cookie).split(".")[1]

 if(signed === signedCookie){
  return cookie
 }
 return false
}

export async function getSessionId() {
  const cookieStore = await cookies()
  const sessionId = cookieStore.get("sid")?.value;

  if(!sessionId){
    return Response.json({
    error: "Please login.",
  }, {status : 401});
  }

  return decryptCookie(sessionId);
}


export async function deleteCookie() {
  (await cookies()).delete("sid")
}


