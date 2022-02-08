const { connect } = require('mongoose');

const connectToDatabase = async () => {
    await connect(process.env.DB_URI);
}

module.exports = { connectToDatabase };