import { stream } from './logger';
import morgan from 'morgan';

const format = ':method :url :status :res[content-length] - :response-time ms';

export default morgan(format, { stream: stream });