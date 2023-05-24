import fastify from "fastify";
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import qs from 'qs';
import usersRoute from "./modules/users/users.route";
import {UserEntity} from "./entities/user.entity";
const dbConn = require('typeorm-fastify-plugin');

 function buildServer() {
    const server = fastify({
        logger: {
            transport: {
                target: 'pino-pretty',
                options: {
                    colorize: true
                }
            },
        },
        ajv: {
            customOptions: {
                strict: 'log',
                keywords: ['kind', 'modifier', 'min', 'max', 'style']
            }
        },
        querystringParser: (str: string) => qs.parse(str),
    }).withTypeProvider<TypeBoxTypeProvider>()

    server
        .register(dbConn, {
            host: 'localhost',
            port: 5432,
            type: 'postgres',
            database: 'postgres',
            username: 'test',
            password: 'test_pass',
            entities: [UserEntity],
        })
        .ready();

    server.get("/", async function () {
        return {hello: 'hello world'}
    });

    server.register(usersRoute, {prefix: "api/users"});

    return server;
}

const server = buildServer();

const start = async () => {
    try {
        await server.listen({ port: 3000 })
    } catch (err) {
        server.log.error(err)
        process.exit(1)
    }
}
start()
