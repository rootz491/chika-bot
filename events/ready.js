const mongoose = require('mongoose');

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        await mongoose.connect(process.env.MONGO_URI, {
            keepAlive: true
        });

        if (mongoose.connection.readyState === 1) {
            console.log('Connected to MongoDB!');
        } else {
            console.log('Failed to connect to MongoDB!');
        }

        console.log(`Logged in as ${client.user.tag}`);
    }
}