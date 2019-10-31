import { Request, Response, Router } from 'express';

/** Creates a router instance */
const router: Router = Router();

/** Tests router GET endpoint */
router.get('/hello/:name', (req: Request, res: Response) => res.send({ message: `Hello ${ req.params.name }!` }));

/** Exports routes as default */
export default router;