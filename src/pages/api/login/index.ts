// pages/api/login.js

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { username, password } = req.body;

    // Check credentials (Replace this with your user data retrieval logic)
    if (username === "dummyuser" && password === "password") {
      // Create a JWT token
      const token = jwt.sign({ username }, process.env.SECRET_KEY || "", {
        expiresIn: "1h",
      });

      res.status(200).json({ token });
    } else {
      res.status(401).json({ error: "Authentication failed" });
    }
  } else {
    res.status(405).end();
  }
};
