import { Router } from 'express';

import { getOrders, getOrdersCount, getStatiscticFile, uploadOrdersByCsv } from '../controllers';

export const orderRoutes = Router();

orderRoutes.get('/count', getOrdersCount);
orderRoutes.get('/all', getOrders);
orderRoutes.get('/statistic', getStatiscticFile);

orderRoutes.post('/upload', uploadOrdersByCsv);
