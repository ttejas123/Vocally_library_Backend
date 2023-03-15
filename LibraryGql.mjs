import { ApolloServer, gql } from 'apollo-server';
import { PrismaClient } from '@prisma/client';
import typeDefs from "./schema/libraryGrphqlgpl.mjs"
import {ApolloServerPluginLandingPageGraphQLPlayground} from 'apollo-server-core'
const prisma = new PrismaClient();

const resolvers = {
  Query: {
    students: async () => {
      return await prisma.student.findMany();
    },
    books: async () => {
      return await prisma.book.findMany();
    },
    student: async(parent, args) => await prisma.student.findUnique({where: {id: args.id}}),
    books: async(parent, args) => await prisma.book.findUnique({where: {id: args.id}})
  }
}
       
const server = new ApolloServer({
    typeDefs,
    resolvers: resolvers,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground]
})

server.listen(4000).then(({url})=> {
    console.log(url)
})
