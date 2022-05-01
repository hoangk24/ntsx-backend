import App from '@/app';
import { NODE_ENV, PORT } from '@/config';
import CartRoute from '@/routes/cart.route';
import CategoryRoute from '@/routes/category.route';
import CommentRoute from '@/routes/comment.route';
import DashboardRoute from '@/routes/dashboard.route';
import DiscountRoute from '@/routes/discount.route';
import EmailRoute from '@/routes/email.route';
import ProductRoute from '@/routes/product.route';
import ProvinceRoute from '@/routes/province.route';
import VoucherRoute from '@/routes/voucher.route';
import SocketServer from '@/socket';
import Comment from '@/socket/Comment';
import { logger } from '@/utils/logger';
import AuthRoute from '@routes/auth.route';
import IndexRoute from '@routes/index.route';
import UsersRoute from '@routes/users.route';
import validateEnv from '@utils/validateEnv';
import http from 'http';

validateEnv();

async function bootstrap() {
  const app = new App([
    new IndexRoute(),
    new UsersRoute(),
    new AuthRoute(),
    new ProductRoute(),
    new CategoryRoute(),
    new CartRoute(),
    new ProvinceRoute(),
    new CommentRoute(),
    new EmailRoute(),
    new DiscountRoute(),
    new VoucherRoute(),
    new DashboardRoute(),
  ]);
  return http.createServer(app.getServer()).listen(PORT, () => {
    logger.info(`=================================`);
    logger.info(`======= ENV: ${NODE_ENV} =======`);
    logger.info(`🚀 App listening on the port ${PORT}`);
    logger.info(`=================================`);
  });
}
const sc = new SocketServer([Comment]);
bootstrap()
  .then(server => {
    sc.io.attach(server, {
      cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
        credentials: true,
      },
    });
  })
  .catch(error => {
    setImmediate(() => {
      console.error('Server Error:');
      console.error(error);
      process.exit();
    });
  });
