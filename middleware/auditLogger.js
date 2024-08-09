// const logger = require('../utils/logger');

// const auditLogger = (req, res, next) => {
//     const log = {
//         userName: req.session?.user?.userName || 'anonymous',
//         sessionId: req.cookies["connect.sid"] || 'N/A',
//         url: req.originalUrl,
//         method: req.method,
//     };
//     logger.info('User activity', { meta: log });
//     next();
// };

// module.exports = auditLogger;
