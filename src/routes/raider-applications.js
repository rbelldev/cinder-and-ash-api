let raiderApplicationDatabaseTableCommunicator = require('../communicators/database-table-communicators/raider-application-database-table-communicator');

let post = async (request, response) => {
    try {
        await raiderApplicationDatabaseTableCommunicator.insert(request.body);
        response.sendStatus(201)
    } catch (e) {
        response.sendStatus(500)
    }
};

module.exports = {post: post};
