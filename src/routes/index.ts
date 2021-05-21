import { Router } from 'express';

import accountsRoutes from './accounts.routes';
import categoriesRoutes from './categories.routes';
import specificationsRoutes from './specifications.routes';

const router = Router();

router.use('/categories', categoriesRoutes);
router.use('/specifications', specificationsRoutes);
router.use('/users', accountsRoutes);

export default router;
