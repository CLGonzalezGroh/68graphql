import { ApolloServer, gql } from 'apollo-server'
import { typeDefs } from './schema'
import { resolvers } from './resolver'

// // 1 - Query
// const typeDefs = gql`
//   type Query {
//     info: String!
//   }
// `

// 2 - Resolvers
// const resolvers = {
//   Query: {
//     info: () => 'Hello from graphQL',
//   },
// }

// 3 - Server start
const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => console.log(`Server running on ${url}`))
