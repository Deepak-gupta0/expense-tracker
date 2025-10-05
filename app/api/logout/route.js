import { deleteCookie, getSessionId } from "@/lib/auth";
import { Session } from "@/models/SessionModel";

export async function POST() {
  const sessionId =  await getSessionId();

  await Session.findByIdAndDelete(sessionId);
  await deleteCookie()

  return new Response(null, {status : 204})
}
