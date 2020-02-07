import * as _ from 'lodash';
import * as path from 'path';
import { Response } from 'supertest';

import { request } from './setup';
import { Order } from '../models';
import getRowsFromCsv from '../utils/getRowsFromCsv';

const testOrder = {
        userEmail: 'orderRoutesTest@gmail.com',
        date: new Date().toISOString(),
        value: 12.5,
        currency: 'USD',
        status: 'rejected',
    },
    pathToTestCsv = path.join(__dirname, 'input_test.csv');

describe('Order routes', () => {
    it('should return an empty array of orders', done => {
        request
            .get('/order/all')
            .set('Accept', 'application/json')
            .expect(200, [], done);
    });
    it('should return one user', async done => {
        await new Order(testOrder).save();
        request
            .get('/order/all')
            .set('Accept', 'application/json')
            .expect(200)
            .end((err, res: Response) => {
                if (err) done(err);
                const { body } = res;
                expect(body.length).toBe(1);

                const [resOrder] = body;
                expect(_.pick(resOrder, Object.keys(testOrder))).toEqual(testOrder);
                done();
            });
    });
    it('should upload csv file', async done => {
        const rowsCount = (await getRowsFromCsv(pathToTestCsv)).length;
        request
            .post('/order/upload')
            .attach('csv', pathToTestCsv)
            .expect(200, `{"message":"${rowsCount} orders created successfully"}`, done);
    });
    it('should fail with duplicate email and date', async done => {
        request
            .post('/order/upload')
            .attach('csv', pathToTestCsv)
            .expect(400)
            .end((err, res: Response) => {
                if (err) done(err);
                expect(res.body.error.startsWith('Order for user'));
                done();
            });
    });
});
