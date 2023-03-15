import {gql} from 'apollo-server'

const typeDefs = gql`
type Query {
    students: [Student!]!
    books: [Book!]!
    student(id:ID!):Student
    book(id:ID!):Book
}

type Student {
  id: String
  name: String
  email: String
  password: String
  books: [Book]
}

type Book {
  id: String
  name: String
  author: String
  students: [Student]
}

schema {
  query: Query
}`

export default typeDefs
  