import jwt from "jsonwebtoken";
const switchBackToAdmin = async (req, res) => {

    const backupToken = req.cookies.admin_backup_token;
   
    if (!backupToken) {
        return res.status(401).json({ message: 'No backup admin session found' });
    }

    try {
        const decoded = jwt.verify(backupToken, process.env.JWT_SECRET);
        if (decoded.role !== 'operation') {
            return res.status(403).json({ message: 'Not authorized to switch back' });
        }

        // Set admin token back as session token
        res.cookie('token', backupToken, {
            httpOnly: false,
            secure: false,
            sameSite: 'lax',
            maxAge: 2 * 60 * 60 * 1000,
        });

        // Remove backup token for security
        res.clearCookie('admin_backup_token');

        res.status(200).json({ success: true, message: 'Switched back to admin' });
    } catch (err) {
        res.status(401).json({ message: 'Invalid backup token' });
    }

};

export default switchBackToAdmin;
