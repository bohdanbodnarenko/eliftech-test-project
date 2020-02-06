import 'dotenv/config';
import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';

import { createMongoConnection } from './utils';

export const startServer = async (): Promise<express.Express> => {
    const app = express();

    app.use(cors());
    app.use(bodyParser.json());

    await createMongoConnection(
        process.env.NODE_ENV === 'test' ? process.env.MONGO_URI_TEST : process.env.MONGO_URI_DEVELOPMENT,
    );

    const port = process.env.EXPRESS_PORT || 4000;

    app.listen(port, () => {
        console.log(`🚀 Server is running on http://localhost:${port}/ 🚀`);
    });

    return app;
};
