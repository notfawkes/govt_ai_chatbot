import jwt from "jsonwebtoken";

export const authMiddleware = (req : any, res : any, next : any) => {
  const token = req.headers.authorization?.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
  req.userId = decoded.userId;
  next();
};
