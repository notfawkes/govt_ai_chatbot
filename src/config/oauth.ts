import axios from "axios";
import { GoogleTokenPayloadSchema } from "../modules/auth/auth.types";

export async function verifyGoogleToken(idToken: string) {
  const res = await axios.get(
    `https://oauth2.googleapis.com/tokeninfo?id_token=${idToken}`
  );

  return GoogleTokenPayloadSchema.parse(res.data);
}
