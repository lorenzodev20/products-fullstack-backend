import { Sequelize } from "sequelize-typescript";
import dotenv from 'dotenv';
dotenv.config({quiet: true});
// Option 1: solve configuration
//`${process.env.DATABASE_URL}?ssl=true`

const db = new Sequelize(`${process.env.DATABASE_URL}?ssl=true`,{
    models:[__dirname+'/../models/**/*'],
    logging: false
});

export default db;
