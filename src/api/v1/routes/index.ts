import { Request, Response, Router } from 'express';

import transactionsRouter from './transactions';

/** Creates a router instance */
const router: Router = Router();

/** Tests router GET endpoint */
router.get('/hello/:name', ({ params: { name } }: Request, res: Response) => res.send({ message: `Hello ${ name }!` }));

/** Inject more routers in main router */
router.use(transactionsRouter);

/** Exports routes as default */
export default router;