import axios from 'axios';
import { parseString } from 'xml2js';
import { Currency } from '../models/Currency';

export const fetchRates = async () => {
  try {
    const response = await axios.get('https://www.nationalbank.kz/rss/rates_all.xml');

    if (response.status !== 200) {
      console.error('Error fetching exchange rates');
      return;
    }

    parseString(response.data, async (err, result) => {
      if (err) {
        console.error('Error parsing XML:', err);
        return;
      }

      const items = result.rss.channel[0].item;
      for (let item of items) {
        const name = item.title[0];
        const rate = parseFloat(item.description[0]);

        // Here, we'll try to update the rate if it exists, otherwise, we'll insert a new one.
        const existingCurrency = await Currency.findOne({where: { name } });
        if (existingCurrency) {
          existingCurrency.rate = rate;
          existingCurrency.changed('rate', true);
          await existingCurrency.save();
        } else {
          await Currency.create({
            name,
            rate
          });
        }
      }
    });

  } catch (error) {
    console.error('An error occurred:', error);
  }
}

