import { connectDb } from '../server';
import db from '../config/db';

// describe('GET /api', () => {

//     it('should send back a json response', async () => {

//         const res = await request(server).get('/api');
//         expect(res.status).toBe(200);
//         expect(res.headers['content-type']).toMatch(/json/);

//         expect(res.body.message).toMatch('Desde API');
//         expect(res.status).not.toBe(400);

//     });

// });

jest.mock('../config/db');

describe('connectDb', () => {
    it('should dispatch exception when connect to database', async () => {
        jest.spyOn(db, 'authenticate')
            .mockRejectedValueOnce(new Error("Has error occurred to database connection"));
        const consoleSpy = jest.spyOn(console, 'log');

        await connectDb();
        expect(consoleSpy).toHaveBeenLastCalledWith(
            expect.stringContaining("Has error occurred to database connection")
        );

    });
});