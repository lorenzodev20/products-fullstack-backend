import express from 'express';
import router from './router';
import db from './config/db';
import colors from 'colors';
import cors, { CorsOptions } from 'cors';
import swaggerUi, { serve } from 'swagger-ui-express';
import swaggerSpec, { swaggerUiOptions } from './config/swagger';
import morgan from 'morgan';

export async function connectDb() {
    try {
        await db.authenticate();
        db.sync();
        // console.log(colors.blue("Successful connection to database"));
    } catch (error) {
        console.log(colors.red.bold("Has error occurred to database connection"));
        console.error(error);
    }
}

connectDb();

const server = express();

// CORS
const whitelist = [`http://localhost:${process.env.PORT}`, process.env.FRONTEND_URL];

const corsOptions: CorsOptions = {
    // origin: function(origin, callback) {
    //     console.log(origin)
    //     if (whitelist.indexOf(origin) !== -1) {
    //         callback(null, true);
    //     }else{
    //         callback(new Error('Error de CORS'));
    //     }
    // }
    origin: whitelist
};

server.use(cors(corsOptions));

// Leer datos
server.use(express.json());

server.use(morgan('dev'));
server.use('/api/products', router);

server.use('/docs',swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions));

export default server;