import { Request, Response, Router } from 'express';

/** Creates a router instance */
const router: Router = Router();

/** Tests router GET endpoint */
router.get('/hello/:name', ({ params: { name } }: Request, res: Response) => res.send({ message: `Hello ${ name }!` }));

/** Exports routes as default */
export default router;