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
    getReviews(title: String!, number: Int = 5): [Review]
  }
`

const resolvers = {
  Query: {
    getReviews: (_, args) => {
      let reviews = []

      for (let i = 0; i < args['number']; i++) {
        reviews.push(generateReview(args['title']))
      }

      return reviews
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
