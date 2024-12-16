import User from "@/models/userModel"; // Ensure the correct path
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer"; // Ensure the correct path
import { connect } from "@/dbConfig/dbCOnfig"; // Corrected path name
import { NextResponse } from "next/server";

// Ensure MongoDB connection is established
await connect(); // Make sure we wait for the DB connection before proceeding

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { username, email, password } = req.body;

      // Check if user already exists
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ error: "User already exists" });
      }

      // Hash the password before saving
      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(password, salt);

      // Create a new user object
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
      });

      // Save the new user to the database
      const savedUser = await newUser.save();

      // Send verification email
      await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });

      // Respond with success message and user data
      return res.status(201).json({
        message: "User created successfully. Please verify your email.",
        success: true,
        user: {
          username: savedUser.username,
          email: savedUser.email,
          id: savedUser._id,
        },
      });
    } catch (error) {
      console.error("Error during signup:", error);
      return res.status(500).json({
        error: "Internal server error. Please try again later.",
      });
    }
  } else {
    // If the method is not POST, return 405 Method Not Allowed
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}
