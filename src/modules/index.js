import { makeExecutableSchema } from '@graphql-tools/schema'



import CategoresModule from './categores/index.js'
import ProductModule from './products/index.js'
import OrdersMudule from './orders/index.js'
import TypesModule from './types/index.js'
import UserModule from './users/index.js'



export default makeExecutableSchema({
    typeDefs: [
        CategoresModule.typeDefs,
        ProductModule.typeDefs,
        OrdersMudule.typeDefs,
        TypesModule.typeDefs,
        UserModule.typeDefs,
    ],
    resolvers: [
        CategoresModule.resolvers,
        ProductModule.resolvers,
        OrdersMudule.resolvers,
        TypesModule.resolvers,
        UserModule.resolvers,
    ]
})