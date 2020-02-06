import * as fs from 'fs';
import { Request, Response } from 'express';
import { IncomingForm } from 'formidable';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import { parse } from 'fast-csv';

import { Order, OrderInterface } from '../models';
import { validOrdersArray } from '../utils/validations/validOrderSchema';
import { formatYupError } from '../utils/formatYupError';
import getRowsFromCsv from '../utils/getRowsFromCsv';

export const getOrders = async (req: Request, res: Response): Promise<Response> => {
    const { limit, offset, sortBy } = req.query;

    const orders = await Order.find()
        .sort(sortBy || '')
        .skip(offset || 0)
        .limit(limit || 50);
    console.log(orders);
    return res.json(orders);
};

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
export const uploadOrdersByCsv = async (req: Request, res: Response): Promise<Response> => {
    const form = new IncomingForm();
    form.keepExtensions = true;
    form.parse(req, async (err, _, files) => {
        if (err) {
            return res.status(400).json({ error: "File can't be uploaded" });
        }

        let orders: OrderInterface[] = [];

        if (files.file) {
            orders = await getRowsFromCsv<OrderInterface>(files.file.path);
            try {
                await validOrdersArray.validate(orders, { abortEarly: false });
                return res.json(orders);
            } catch (e) {
                return res.status(400).json(formatYupError(e));
            }
        } else {
            return res.status(400).json({ error: 'Please provide a csv file' });
        }
    });
    // return res.status(400).json({ error: 'Bad request' });
};
