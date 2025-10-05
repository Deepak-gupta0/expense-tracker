import { getAuthUser } from "@/lib/auth";

export async function GET() {
  const user = await getAuthUser()
  if(user instanceof Response){
    return user
  }
  return Response.json(user)
}
