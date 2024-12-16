import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbCOnfig";

connect();

export default async function handler(req, res) {
    try {
        if (req.method !== "GET") {
            return res.status(405).json({ error: "Method not allowed" });
        }

        const userId = await getDataFromToken(req);
        const user = await User.findOne({ _id: userId }).select("-password");

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        return res.status(200).json({
            message: "User found",
            data: user,
        });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}
