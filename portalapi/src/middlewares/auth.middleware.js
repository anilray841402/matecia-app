import jwt from "jsonwebtoken";

const isLoggedIn = async (req, res, next) => {
    
    try {
        let token = req.cookies?.token;
        if(!token) {
            return res.status(401).json({
                success: false,
                message: "Authentication Fail",
            });
        }

        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();

    } catch(error) {
        return res.status(500).json({ 
            success: true,
            message: "Internal server error",
            errorr: error,
        });
    }
}

export { isLoggedIn };