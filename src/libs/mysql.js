import mysql from "serverless-mysql";

export const pool = mysql({
    config: {
        host: 'localhost',
        user: 'root',
        password: 'Hplus_123',
        port: 3306,
        database: 'hpluskb'
    }
});