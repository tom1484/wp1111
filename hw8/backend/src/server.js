import * as fs from 'fs';
import { createServer } from 'node:http';
import { WebSocketServer } from 'ws';
import { createPubSub, createSchema, createYoga } from 'graphql-yoga';
import { useServer } from 'graphql-ws/lib/use/ws';

import ChatRoomModel from './models/ChatRoomModel';

import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';
import Subscription from './resolvers/Subscription';
import ChatRoom from './resolvers/ChatRoom';

const pubsub = createPubSub();

const yoga = createYoga({
    cors: {
        origin: ['http://localhost:3000'],
        credentials: true,
    },
    schema: createSchema({
        typeDefs: fs.readFileSync(
            './src/schema.graphql',
            'utf-8',
        ),
        resolvers: {
            Query,
            Mutation,
            Subscription,
            ChatRoom,
        },
    }),
    context: {
        ChatRoomModel,
        pubsub,
    },
});

const httpServer = createServer(yoga);
const wsServer = new WebSocketServer({
    server: httpServer,
    path: yoga.graphqlEndpoint,
});

useServer(
    {
        execute: (args) => args.rootValue.execute(args),
        subscribe: (args) => args.rootValue.subscribe(args),
        onSubscribe: async (ctx, msg) => {
            const { schema, execute, subscribe, contextFactory, parse, validate } =
                yoga.getEnveloped({
                    ...ctx,
                    req: ctx.extra.request,
                    socket: ctx.extra.socket,
                    params: msg.payload
                })
            const args = {
                schema,
                operationName: msg.payload.operationName,
                document: parse(msg.payload.query),
                variableValues: msg.payload.variables,
                contextValue: await contextFactory(),
                rootValue: {
                    execute,
                    subscribe
                }
            }
            const errors = validate(args.schema, args.document)
            if (errors.length) return errors
            return args
        },
    },
    wsServer,
);

export default httpServer;