import * as avo from './modules/avocado/avocado.resolvers'
import * as scalar from './modules/base/scalars.model'
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
