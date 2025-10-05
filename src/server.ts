import express from 'express';
import router from './router';
import db from './config/db';
import colors from 'colors';

async function connectDb() {
    try {
        await db.authenticate();
        db.sync();
        console.log(colors.blue("Successful connection to database"));
    } catch (error) {
        console.log(colors.red.bold("Has error occurred to database connection "));
        console.error(error);
    }
}

connectDb();

const server = express();

// Leer datos
server.use(express.json());

server.use('/api/products', router);

export default server;