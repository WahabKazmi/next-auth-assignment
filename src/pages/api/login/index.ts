import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

const USER = [
  {
    name: "wahab_kazmi",
    password: "Abc132#",
  },
  {
    name: "john_doe",
    password: "Abc132#",
  },
];

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Both username and password are required." });
    }
    const sanitizedUsername = username.trim();
    const sanitizedPassword = password.trim();

    if (sanitizedUsername.length < 5 || sanitizedUsername.length > 20) {
      return res
        .status(400)
        .json({ error: "Username must be between 5 and 20 characters." });
    }

    const isRegisteredUser = USER.find(
      ({ name, password }) =>
        name === sanitizedUsername && password === sanitizedPassword
    );

    if (isRegisteredUser) {
      const token = jwt.sign(
        { username: sanitizedUsername },
        process.env.SECRET_KEY || "",
        {
          expiresIn: "1h",
        }
      );

      res.status(200).json({ token, user: isRegisteredUser });
    } else {
      res.status(401).json({ error: "Authentication failed" });
    }
  } else {
    res.status(405).end();
  }
};
