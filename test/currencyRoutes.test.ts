import supertest from 'supertest';
import fastify from 'fastify';
import { Sequelize } from 'sequelize';
import { currencyRoutes } from '../src/routes/currencies';
import { Currency, initializeCurrencyModel } from '../src/models/Currency';
import { getDbURL } from '../src/utils/getDbUrl';
require('dotenv').config();

const app = fastify();
const sequelize = new Sequelize(getDbURL());
initializeCurrencyModel(sequelize);
currencyRoutes(app);

// Mocking auth middleware for testing purposes
// app.decorate('authenticate', async (request, reply) => {});

describe('Currency Routes', () => {
  beforeAll(async () => {
    // connect to the database and create tables
    await sequelize.authenticate();
    await Currency.create({ name: 'TEST', rate: 300 });
  });

  afterAll(async () => {
    // close the database connection
    const currency = await Currency.findOne({ where: { name: 'TEST' } });
    if (currency) {
      await currency.destroy();
    }
    await sequelize.close();
  });

  it('should fetch all currencies', async () => {
    const response = await supertest(app.server)
      .get('/currencies')
      .expect(200);

    expect(response.body).toHaveLength(1);
    expect(response.body[0].name).toBe('TEST');
  });

  it('should fetch a specific currency by ID', async () => {
    const currency = await Currency.findOne({ where: { name: 'TEST' } });
    const response = await supertest(app.server)
      .get(`/currency/${currency?.id}`)
      .expect(200);

    expect(response.body.name).toBe('TEST');
    expect(response.body.rate).toBe(300);
  });
});

