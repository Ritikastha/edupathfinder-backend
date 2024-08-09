const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');
const authGuard = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    // if (!token) {
    //     return res.status(401).json({
    //         success: false,
    //         message: "Authorization header not found!"
    //     });
    // }
    if (!token) {
        const log = {
            userName: req.session?.user?.email|| 'Anonymous',
            sessionId: req.cookies['connect.sid'] || 'No session',
            url: req.originalUrl,
            method: req.method,
        };
        logger.error('Authorization header not found!', { meta: log });
        return res.status(401).json({
            success: false,
            message: 'Authorization header not found!',
        });
    }
    jwt.verify(token, process.env.JWT_TOKEN_SECRET, (err, user) => {
//         if (err) {
//             return res.status(403).json({
//                 success: false,
//                 message: 'Token is invalid'
//             });
//         }
//         req.userId = user.id; 
//         req.userFullName = user.fullName;
//         next();
//     });
// };
if (err) {
    const log = {
        userName: req.session?.user?.email || 'Anonymous',
        sessionId: req.cookies['connect.sid'] || 'No session',
        url: req.originalUrl,
        method: req.method,
    };
    logger.error('Token is invalid', { meta: log });
    return res.status(403).json({
        success: false,
        message: 'Token is invalid',
    });
}

req.userId = user.id; // Ensure this matches your token payload
req.userFullName = user.fullName;
next();
});
};


const authGuardAdmin = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.json({
            success: false,
            message: "Authorization header not found!"
        });
    }
    // const authHeader = req.headers.authorization;
    // if (!authHeader) {
    //     const message = "Authorization header not found!";
    //     logger.error(message, { 
    //         url: req.originalUrl,
    //         method: req.method,
    //         userName: req.session?.user?.userName,
    //         sessionId: req.cookies ? req.cookies["connect.sid"] : 'N/A',
    //         error: message
    //     });

    //     return res.json({
    //         success: false,
    //         message
    //     });
    // }
// ----

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.json({
            success: false,
            message: "Token not found!"
        });
    }
    // if (!token) {
    //     const message = "Token not found!";
    //     logger.error(message, { 
    //         url: req.originalUrl,
    //         method: req.method,
    //         userName: req.session?.user?.userName,
    //         sessionId: req.cookies ? req.cookies["connect.sid"] : 'N/A',
    //         error: message
    //     });

    //     return res.json({
    //         success: false,
    //         message
    //     });
    // }
// ----
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
        // if (!decodedUser.isAdmin) {
        //     const message = "Permission denied";
        //     logger.warn(message, { 
        //         url: req.originalUrl,
        //         method: req.method,
        //         userName: req.session?.user?.userName,
        //         sessionId: req.cookies ? req.cookies["connect.sid"] : 'N/A',
        //     });

        //     return res.json({
        //         success: false,
        //         message
        //     });
        // }
        // ---
        next();
    // }
    //     catch (error) {
    //         const message = "Invalid Token";
    //         logger.error(message, { 
    //             url: req.originalUrl,
    //             method: req.method,
    //             userName: req.session?.user?.userName,
    //             sessionId: req.cookies ? req.cookies["connect.sid"] : 'N/A',
    //             error: error.message
    //         });
    
    //         res.json({
    //             success: false,
    //             message
    //         });
    //     }
    // };
    } catch (error) {
        res.json({
            success: false,
            message: "Invalid Token"
        });
    }
};

const auditLogger = (req, res, next) => {
    try {
        const userName = req.session && req.session.user ? req.session.user.email : 'anonymous';
        
        // Create the log object
        const log = {
            sessionId: req.cookies["connect.sid"] || 'No session',
            url: req.originalUrl,
            method: req.method,
            userName: userName
        };

        // Log the information
        console.log(`User activity: ${userName}`);
        logger.info('User activity', { meta: log });
    } catch (error) {
        console.error('Error in auditLogger:', error);
    }

    // Call the next middleware or route handler
    next();
};



module.exports = { authGuard, authGuardAdmin,auditLogger };
