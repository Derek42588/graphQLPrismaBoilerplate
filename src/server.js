import { GraphQLServer, PubSub } from 'graphql-yoga';
import {resolvers, fragmentReplacements} from './resolvers'

import prisma from './prisma';

const pubsub = new PubSub()

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  fragmentReplacements,
  context(request) {
    return {
      prisma,
      request,
      pubsub
    };
  },
});

export {server as default }