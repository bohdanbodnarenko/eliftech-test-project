import { Router } from 'express';

import { getOrders, uploadOrdersByCsv } from '../controllers';

export const orderRoutes = Router();

orderRoutes.get('/all', getOrders);

orderRoutes.post('/upload', uploadOrdersByCsv);
