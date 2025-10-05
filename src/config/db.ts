import { Sequelize } from "sequelize-typescript";
import dotenv from 'dotenv';
dotenv.config();
// Option 1: solve configuration
//`${process.env.DATABASE_URL}?ssl=true`

const db = new Sequelize(`${process.env.DATABASE_URL}?ssl=true`,{
    models:[__dirname+'/../models/**/*.ts']
});

export default db;
