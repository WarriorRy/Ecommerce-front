export default async function handler(req, res) {
    try {
        if (req.method !== "GET") {
            return res.status(405).json({ error: "Method not allowed" });
        }

        // Set cookie to empty and expired to log the user out
        res.setHeader('Set-Cookie', 'token=; HttpOnly; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT');

        return res.status(200).json({
            message: "Logout successful",
            success: true,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
