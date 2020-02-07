import { Request, Response } from 'express';

import { Order, OrderProperties } from '../models';
import { validOrdersArray } from '../utils/validations/validOrderSchema';
import { formatYupError } from '../utils/formatYupError';
import getRowsFromCsv from '../utils/getRowsFromCsv';
import { getFilesFromReq } from '../utils/getFilesFromReq';

export const getOrders = async (req: Request, res: Response): Promise<Response> => {
    const { limit, offset, sortBy } = req.query;

    const orders = await Order.find()
        .sort(sortBy || '')
        .skip(+offset || 0)
        .limit(+limit || 50);
    return res.json(orders);
};

export const uploadOrdersByCsv = async (req: Request, res: Response): Promise<Response> => {
    const files = await getFilesFromReq(req);
    if (files.csv) {
        const orders = await getRowsFromCsv<OrderProperties>(files.csv.path);
        try {
            await validOrdersArray.validate(orders, { abortEarly: false });

            try {
                await Order.create(orders, { validateBeforeSave: true });
                return res.json({ message: `${orders.length} orders created successfully` });
            } catch (e) {
                if (e.code === 11000) {
                    const { userEmail, date } = e.keyValue;
                    res.status(400).json({ error: `Order for user ${userEmail} with date ${date} exists already` });
                } else {
                    console.error(e);
                    res.status(500).json({ error: 'Server error, please try again' });
                }
            }
        } catch (e) {
            return res.status(400).json(formatYupError(e));
        }
    } else {
        return res.status(400).json({ error: 'Please provide a csv file' });
    }
};
