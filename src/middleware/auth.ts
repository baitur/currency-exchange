import { FastifyInstance } from 'fastify';
import fastifyBearerAuth from '@fastify/bearer-auth';

require('dotenv').config();

const keys = new Set([process.env.JWT_SECRET ?? 'some_secret_key']);


export async function authMiddleware(fastify: FastifyInstance & PromiseLike<FastifyInstance>) {
    fastify.register(fastifyBearerAuth, {keys});
}

