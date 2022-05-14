import { gql } from 'apollo-server'

export const typeDefs = gql`
  scalar DateTime

  type Query {
    avos(skip: Int, take: Int, where: AvocadoWhereInput): [Avocado]!
    avo(id: ID!): Avocado
  }

  type Mutation {
    createAvo(data: AvoCreateInput!): Avocado!
  }

  interface BaseModel {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime
    deletedAt: DateTime
  }

  type Attributes {
    description: String
    shape: String
    hardiness: String
    taste: String
  }

  type Avocado implements BaseModel {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime
    deletedAt: DateTime

    name: String!
    sku: String!
    price: Float!
    image: String!
    attributes: Attributes!
  }

  input AvoCreateInput {
    name: String!
    price: Float!
    image: String!
    description: String
    shape: String
    hardiness: String
    taste: String
  }

  input AvocadoWhereInput {
    name: StringFilterInput
    price: Float
  }

  input StringFilterInput {
    equals: String
    in: [String]
    notIn: [String]
    lt: String
    lte: String
    gt: String
    gte: String
    contains: String
    startsWith: String
    endsWith: String
    not: String
  }
`
