import type { Avocado, Attributes, PrismaClient, Prisma } from '@prisma/client'
import { AuthenticationError } from 'apollo-server-express'

type ResolverContext = {
  orm: PrismaClient
  user: Express.User | undefined
}

// Type Resolver
export const resolver: Record<
  keyof (Avocado & { attributes: Attributes }),
  (parent: Avocado & { attributes: Attributes }) => unknown
> = {
  id: (parent) => parent.id,
  createdAt: (parent) => parent.createdAt,
  updatedAt: (parent) => parent.updatedAt,
  deletedAt: (parent) => parent.deletedAt,
  sku: (parent) => parent.sku,
  name: (parent) => parent.name,
  price: (parent) => parent.price,
  image: (parent) => parent.image,
  attributes: (parent) => ({
    description: parent.attributes.description,
    shape: parent.attributes.shape,
    hardiness: parent.attributes.hardiness,
    taste: parent.attributes.taste,
  }),
}

//------------------
// Queries Resolvers
//------------------

export function findAll(
  parent: unknown,
  args: { skip?: number; take?: number; where: Prisma.AvocadoWhereInput },
  context: ResolverContext
): Promise<Avocado[]> {
  return context.orm.avocado.findMany({
    include: { attributes: true },
    skip: args.skip,
    take: args.take,
    where: args.where,
  })
}

export function findOne(
  parent: unknown,
  args: { id: string },
  context: ResolverContext
): Promise<Avocado | null> {
  const avo = context.orm.avocado.findUnique({
    where: { id: parseInt(args.id, 10) },
    include: { attributes: true },
  })
  return avo
}

//--------------------
// Mutations Resolvers
//--------------------

export function createAvo(
  parent: unknown,
  {
    data,
  }: {
    data: Pick<Avocado, 'name' | 'price' | 'image'> & Omit<Attributes, 'id'>
  },
  { orm, user }: ResolverContext
): Promise<Avocado> {
  if (user == undefined) {
    throw new AuthenticationError('Unauthenticated')
  }
  const { name, price, image, description, shape, hardiness, taste } = data
  const newAvo = orm.avocado.create({
    data: {
      name,
      image,
      price,
      sku: new Date().getTime().toString(),
      attributes: {
        create: {
          description,
          shape,
          hardiness,
          taste,
        },
      },
    },
  })
  return newAvo
}
