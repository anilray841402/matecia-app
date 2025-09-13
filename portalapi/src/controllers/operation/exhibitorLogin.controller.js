import { body } from "express-validator";
import User from "../../models/user.model.js";
import jwt from "jsonwebtoken";

const exhibitorLogin = async (req, res) => {

    const userId = req.params.id;
    const operationToken  = req.cookies.token;

    if (!operationToken) return res.status(401).json({ message: 'Unauthorized' });

    // Decode the admin token
    let decoded;
    try {
        decoded = jwt.verify(operationToken, process.env.JWT_SECRET);
        if (decoded.role !== 'operation') {
            return res.status(403).json({ message: 'Only admin can impersonate' });
        }
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }

    // Save adminId temporarily in a secure cookie
    res.cookie('admin_backup_token', operationToken, {
        httpOnly: false,
        secure: false, // true in production with HTTPS
        sameSite: 'lax',
        maxAge: 2 * 60 * 60 * 1000, // 2 hours
    });

    const exhibitor = await User.findById(userId);
    if (!exhibitor) {
        return res.status(404).json({ message: 'Exhibitor not found' });
    }
    // Create a token for the exhibitor
    const token = jwt.sign(
        { id: exhibitor._id, role: "user" },
        process.env.JWT_SECRET,
        { expiresIn: '2h' }
    );

    const cookieOptions = {
        httpOnly: false,
        secure: false,      // set to true if you're using HTTPS
        sameSite: 'lax',    // helps with CSRF protection
        maxAge: 2 * 60 * 60 * 1000 // 2 hours in milliseconds
    };

    res.cookie("token", token, cookieOptions); // set exhibitor token
    res.status(200).json({
        success: true,
        Message: "Impersonated successfully",
        data: token
    });

    // res.json({ token });

};

export default exhibitorLogin;
