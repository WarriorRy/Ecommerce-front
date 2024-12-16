import { connect } from "@/dbConfig/dbCOnfig";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User does not exist" });
    }

    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: "Invalid password" });
    }

    const tokenData = { id: user._id, email: user.email };
    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, { expiresIn: "1d" });

    res.setHeader("Set-Cookie", `token=${token}; HttpOnly; Path=/; Max-Age=86400`);

    return res.status(200).json({
      message: "Login successful",
      success: true,
      user: { id: user._id, name: user.username, email: user.email },
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
