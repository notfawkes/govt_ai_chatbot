import { googleLogin } from "./auth.service";

export const googleAuthController = async (req: any, res: any) => {
  const { idToken } = req.body;
  const data = await googleLogin(idToken);
  res.json(data);
};
