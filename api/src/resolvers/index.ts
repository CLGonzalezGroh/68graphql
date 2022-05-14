import * as avo from './avocado.resolvers'
import * as scalar from './scalars'
export const resolvers = {
  ...scalar,
  Query: {
    avo: avo.findOne,
    avos: avo.findAll,
  },
  Mutation: {
    createAvo: avo.createAvo,
  },
  Avocado: avo.resolver,
}
