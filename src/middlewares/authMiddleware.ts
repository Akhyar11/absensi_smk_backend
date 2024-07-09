import { Request, Response, NextFunction } from "express";
import { getForCekAdmin } from "../controllers/adminContoller";
import jwt from "jsonwebtoken";
import privetKey from "../assets/privetKey.json";
import { getAdminById } from "../services/adminService";

export const adminAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validAdmin = await getForCekAdmin(req, res);
  const token = req.headers.authorization?.split("Bearer ")[1];

  if (validAdmin) {
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    try {
      const payload = jwt.verify(token, privetKey.value);
      console.log(payload);
      const admin = await getAdminById((payload as jwt.JwtPayload).uid);
      if (!admin) return res.status(401).json({ message: "your not admin" });
      next();
    } catch (error) {
      console.log(error);
      return res.status(401).json({ message: "Unauthorized" });
    }
  } else next();
};

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split("Bearer ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    jwt.verify(token, privetKey.value);
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};
