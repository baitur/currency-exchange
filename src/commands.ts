import { fetchRates } from './commands/fetchRates';
import { Sequelize } from 'sequelize';
import { initializeCurrencyModel } from './models/Currency';
import { getDbURL } from './utils/getDbUrl';

const sequelize = new Sequelize(getDbURL(), {
    dialect: 'postgres'
});

initializeCurrencyModel(sequelize);

const command = process.argv.slice(2);
switch (command[0]) {
    case 'fetch':
        fetchRates().then(r => {

        });
        break;
    default:
        console.log('Unknown command');
        break;
}
