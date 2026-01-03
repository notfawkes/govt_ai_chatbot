import jwt from "jsonwebtoken";
import { verifyGoogleToken } from "../../config/oauth";
import { UserModel } from "../user/user.model";

export async function googleLogin(idToken: string) {
  const payload = await verifyGoogleToken(idToken);

  let user = await UserModel.findOne({ googleId: payload.sub });

  if (!user) {
    user = await UserModel.create({
      googleId: payload.sub,
      email: payload.email,
      name: payload.name
    });
  }

  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  );

  return { token, user };
}
