import { composeMiddlewares } from './middlewares/composeMiddlewares';
import { proxyMiddleware } from './middlewares/proxyMiddleware';

const middlewares = [proxyMiddleware];
export default composeMiddlewares(middlewares);
