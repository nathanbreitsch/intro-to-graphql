const { ApolloServer, gql } = require('apollo-server')
const generateReview = require('./reviews')

const typeDefs = gql`
  type Review {
    rating: Int!
    comment: String!
    reviewer: Reviewer!
  }

  type Reviewer {
    name: String!
    emailAddress: String!
  }

  type Query {
    getReviews: [Review]
  }
`

const resolvers = {
  Query: {
    getReviews: () => {
      return [generateReview('Test')]
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`Server running at ${url}`)
})
