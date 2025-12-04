import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/user.js";
import { getEnv } from "../utils/env.js";


const router = Router();

router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashed,
    });

    return res.json({ msg: "Passasjer Opprettet!", user});
});


// Innlogging/Ombordstigning
router.post("/login", async(req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ msg: "Ugylidg personalia" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ msg: "Ugyldig personalia" });

    const token = jwt.sign(
        { id: user._id, email: user.email },
        getEnv("JWT_SECRET"),
        { expiresIn: "1h"}
    );

    return res.json({ msg: "Velkommen ombord!", token });
});

export default router;