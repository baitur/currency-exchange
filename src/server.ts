import fastify from 'fastify';
import { Sequelize } from 'sequelize';
import { currencyRoutes } from './routes/currencies';
import { authMiddleware } from './middleware/auth';
import { initializeCurrencyModel } from './models/Currency';
import { getDbURL } from './utils/getDbUrl';

const app = fastify({logger: true});

const sequelize = new Sequelize(getDbURL(), {
    dialect: 'postgres'
});

initializeCurrencyModel(sequelize);
authMiddleware(app);
currencyRoutes(app);

app.listen(3000, '0.0.0.0', (err, address) => {
    if (err) throw err;
    app.log.info(`server listening on ${address}`);
});

