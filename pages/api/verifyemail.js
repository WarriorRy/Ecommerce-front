import { connect } from "@/dbConfig/dbCOnfig"; 
import User from "@/models/userModel";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" }); // Only allow POST requests
  }

  try {
    await connect(); // Connect to the database

    const reqBody = req.body; // Parse the request body
    const { token } = reqBody;

    console.log("Received token:", token);

    // Find the user with the matching token and check its expiry
    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ error: "Invalid token or token expired" });
    }

    console.log("User found:", user);

    // Update user status and clear the token
    user.isVerfied = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    await user.save();

    return res.status(200).json({
      message: "Email verified successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error during email verification:", error);
    return res.status(500).json({ error: error.message });
  }
}
