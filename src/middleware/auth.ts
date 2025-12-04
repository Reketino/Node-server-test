import type { Request, Response, NextFunction } from "express";
import { getEnv } from "../utils/env.js";
import jwt, { type Secret } from "jsonwebtoken";


export function auth(req: Request, res: Response, next: NextFunction) {
    const header = req.headers.authorization;


    if(!header) { 
        return res.status(401).json({ msg: "Token er fortapt" });
    }

const parts = header.split(" ");

if (parts.length < 2) {
    return res.status(401).json({ msg: "Token er helt fortapt" });
}


const token = parts[1]!;
const secret: Secret = getEnv("JWT_SECRET") as Secret;

    try {
        const decoded = jwt.verify(token, secret);
        (req as any).user = decoded;
        next();
    } catch {
        return res.status(401).json({ msg: "Token ikke gyldig"})
    }
}