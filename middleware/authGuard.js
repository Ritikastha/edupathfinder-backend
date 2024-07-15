const jwt = require('jsonwebtoken');

const authGuard = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.json({
            success: false,
            message: "Authorization header not found!"
        });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.json({
            success: false,
            message: "Token not found!"
        });
    }

    try {
        const decodedUser = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
        // req.userId = user._id;
        req.userId = decodedUser.id; 
        req.userFullName = decodedUser.fullName; // Assuming your JWT payload contains a `fullName` field
        next();
    } catch (error) {
        res.json({
            success: false,
            message: "Invalid Token"
        });
    }
};


const authGuardAdmin = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.json({
            success: false,
            message: "Authorization header not found!"
        });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.json({
            success: false,
            message: "Token not found!"
        });
    }

    try {
        const decodedUser = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
        req.userId = decodedUser.id; // Assuming your JWT payload contains an `id` field
        req.userFullName = decodedUser.fullName; // Assuming your JWT payload contains a `fullName` field

        if (!decodedUser.isAdmin) {
            return res.json({
                success: false,
                message: "Permission denied"
            });
        }

        next();
    } catch (error) {
        res.json({
            success: false,
            message: "Invalid Token"
        });
    }
};

module.exports = { authGuard, authGuardAdmin };
