import oldResolvers from "./old-resolvers"
import authorResolver, { getAuthorById } from "./author-resolver"
import bookResolver, { filterBooksByAuthorID } from "./book-resolver"




export default {
  Book: {
    author: (book) => getAuthorById(book.authorId)
  },
  Author: {
    books: (author) => filterBooksByAuthorID(author._id)
  },
  Query: {
    ...oldResolvers.Query,
    ...authorResolver.Query,
    ...bookResolver.Query
  },
  Mutation: {
    ...oldResolvers.Mutation,
    ...authorResolver.Mutation,
    ...bookResolver.Mutation,
  }
}