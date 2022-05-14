import { ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
import http from 'http'
import { typeDefs } from './schema'
import { resolvers } from './resolvers'
import { PrismaClient } from '@prisma/client'

import app from './server'
const httpServer = http.createServer(app)

const orm = new PrismaClient()

!(async function () {
  // Same ApolloServer initialization as before, plus the drain plugin.
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      // to block all if there is not user
      // if (req.user == undefined) {
      //   throw new Error('Unauthenticated')
      // }

      return { orm, user: req.user }
    },
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  })

  // More required logic for integrating with Express
  await server.start()
  server.applyMiddleware({
    app,

    // By default, apollo-server hosts its GraphQL endpoint at the
    // server root. However, *other* Apollo Server packages host it at
    // /graphql. Optionally provide this to match apollo-server.
    path: '/graphql',
  })

  // Modified server startup
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  )
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
})()
