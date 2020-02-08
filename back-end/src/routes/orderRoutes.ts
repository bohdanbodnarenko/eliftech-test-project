import { Router } from 'express';

import { getOrders, getOrdersCount, uploadOrdersByCsv } from '../controllers';

export const orderRoutes = Router();

orderRoutes.get('/count', getOrdersCount);
orderRoutes.get('/all', getOrders);

orderRoutes.post('/upload', uploadOrdersByCsv);
