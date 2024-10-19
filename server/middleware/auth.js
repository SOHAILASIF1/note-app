import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

// Middleware to check if the user is authenticated via Authorization header
export const isAuthenticated = async (req, res, next) => {
    try {
        // Extract the Authorization header
        const authHeader = req.headers.authorization;

        // Ensure the Authorization header is present and correctly formatted
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: "Login first to access this resource",
            });
        }

        // Extract the token from the Authorization header
        const token = authHeader.split(' ')[1];

        // Verify the token and decode it using the secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "ALi");

        // Debugging log
        console.log("Decoded Token:", decoded); // Log the decoded token

        // Ensure decoded._id exists
        if (!decoded || !decoded._id) {
            return res.status(401).json({
                success: false,
                message: "Invalid token payload",
            });
        }

        // Fetch the user associated with the decoded token's _id
        const user = await User.findById(decoded._id);

        // If user is not found, return an error
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found",
            });
        }

        // Attach the user to the request object for access in next middleware/route
        req.user = user;

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.error("Token error:", error);

        // Return error response
        return res.status(401).json({
            success: false,
            message: "Authorization error",
        });
    }
};
