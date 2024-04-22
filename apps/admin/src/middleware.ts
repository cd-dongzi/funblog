import { authMiddleware } from './middlewares/authMiddleware';
import { composeMiddlewares } from './middlewares/composeMiddlewares';
import { proxyMiddleware } from './middlewares/proxyMiddleware';

const middlewares = [proxyMiddleware, authMiddleware];
export default composeMiddlewares(middlewares);
