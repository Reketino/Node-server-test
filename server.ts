import express from "express";
import type { Request, Response } from "express";
import "dotenv/config";


const app = express();
app.use(express.json());

interface User {
  id: number;
  name: string;
}

let users: User[] = [{ id: 1, name: "Bear" }];

app.get("/users", (req: Request, res: Response) => {
  res.json(users);
});

app.post("/users", (req: Request, res: Response) => {
  const { name } = req.body as { name: string };
  const newUser: User = { id: users.length + 1, name };
  users.push(newUser);
  res.json(newUser);
});

app.listen(3001, () => {
  console.log(
   "Reketino's TSX server is sprinting for its f***ing life at http://localhost:3001 🏃‍♂️💨"
  );
});
