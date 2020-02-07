import * as dotenv from 'dotenv';
import * as requests from 'supertest';

import { startServer } from '../startServer';
import { Order } from '../models';

export let request: requests.SuperTest<any>;

beforeAll(async () => {
    dotenv.config();
    const app = await startServer();
    request = requests(app);
});

afterAll(async () => {
    Order.deleteMany({}, err => {
        if (err) console.error(err);
        console.log('collection dropped');
        setTimeout(() => process.exit(), 1000);
    });
});
