import config from '@configs/config';
import App from './app/app';
import routes from './routes';

const app = new App(routes);
const port = config.PORT;

app.listen(port);
