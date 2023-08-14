import { Currency } from '../models/Currency';
import { FastifyInstance } from 'fastify/types/instance';
import { FastifyRequest } from 'fastify/types/request';
import { FastifyReply } from 'fastify/types/reply';


type CurrencyRequest = FastifyRequest<{
    Params: {
        id: string;
    }
}>

export async function currencyRoutes(fastify: FastifyInstance) {
    fastify.get('/currencies', async (request: FastifyRequest, reply: FastifyReply) => {
        const currencies = await Currency.findAll(); // Include pagination as per requirement.
        return reply.send(currencies);
    });


    fastify.get('/currency/:id', async (request: CurrencyRequest, reply: FastifyReply) => {
        const currency = await Currency.findByPk(request.params.id);
        return reply.send(currency);
    });
}

