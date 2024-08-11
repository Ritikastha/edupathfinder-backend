const AuditLog = require('../model/auditModel'); // Replace with your actual model

const getLogs = async (req, res) => {
    try {
        const logs = await AuditLog.find({}); // Modify query as needed
        res.json(logs);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching logs', error });
    }
};

module.exports = { getLogs };
