// controllers/auditController.js
const getLogs = async (req, res) => {
    try {
        // Fetch logs from the database or another source
        const logs = [
            { _id: '1', timestamp: new Date(), userName: 'JohnDoe', ipAddress: '192.168.1.1', status: 'Success' }
        ];
        res.json(logs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getLogs };
