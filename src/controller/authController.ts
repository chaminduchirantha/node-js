import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Register } from "../models/register";
import { Login } from "../models/login";


export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await Register.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new Register({ username, email, password: hashedPassword });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await Register.findOne({ email }); // make sure this is Register, not Login
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error('JWT_SECRET is not set. Check your .env or environment variables.');
      return res.status(500).json({ message: 'Server misconfiguration: missing JWT secret' });
    }

    const token = jwt.sign(
      { userId: user._id },
      jwtSecret,
      { expiresIn: "1h" }
    );

    res.json({ message: "Login successful", token });
  } catch (err) {
    console.error("Login error:", err); // <-- log the actual error
    res.status(500).json({ message: "Server error", error: (err as Error).message });
  }
};

// ensure JWT secret exists (defensive check)
// moved loading of .env to src/index.ts; if you prefer .env in project root, move the file there.

