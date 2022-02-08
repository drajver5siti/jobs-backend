const database = require("./db");

require('dotenv').config();
const http = require('http');
const app = require('./app')

const server = http.createServer(app);
const PORT = process.env.PORT || 8080;

database.connectToDatabase()
    .then(() => {
        server.listen(PORT, () => {
            console.log(`Server listening on ${PORT}`);
        })
    })
    .catch((err) => {
        console.log(`Error connecting to database : ${err}`);
    })

