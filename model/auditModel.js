const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema({
    timestamp: {
        type: Date,
        default: Date.now
    },
    userName: {
        type: String,
        required: true
    },
    sessionId: {
        type: String,
        default: 'No session'
    },
    url: {
        type: String,
        required: true
    },
    method: {
        type: String,
        required: true
    },
    // ipAddress: {
    //     type: String,
    //     default: 'Unknown'
    // },
    // eventType: {
    //     type: String,
    //     default: 'User activity'
    // },
    // description: {
    //     type: String,
    //     default: 'No description'
    // },
    // status: {
    //     type: String,
    //     default: 'Success'
    // }
});

const AuditLog = mongoose.model('AuditLog', auditLogSchema);

module.exports = AuditLog;
