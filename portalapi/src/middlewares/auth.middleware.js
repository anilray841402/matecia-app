import jwt from "jsonwebtoken";

const isLoggedIn = async (req, res, next) => {
    // console.log('this is auth middleware');

    try {
        let token = req.cookies?.token;
        // console.log("Cookies:", req.cookies);
        // console.log("Token Found: ", token ? "YES" : "NO");
        
        if(!token) {
            return res.status(401).json({
                success: false,
                message: "Authentication Fail",
            });
        }

        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        // console.log("Decoded data", decoded);
        req.user = decoded;
        next();

    } catch(error) {
        // console.log("error is", error);
        return res.status(500).json({ 
            success: true,
            message: "Internal server error",
            errorr: error,
        });
    }
}

export { isLoggedIn };