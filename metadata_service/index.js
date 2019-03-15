const { ApolloServer, gql } = require('apollo-server')
const generateReview = require('./reviews')

const typeDefs = gql`
  type Review {
    rating: Int!
    comment: String!
    reviewer: Reviewer!
    metadata: InternalMetadata!
  }

  type InternalMetadata {
    id: ID!
    value: String!
  }

  type Reviewer {
    name: String!
    emailAddress: String!
  }

  type Query {
    getReviews(title: String!, number: Int = 5): [Review]
  }
`

const internalMetadata = [
  { id: 0, value: 'asdfasdf' },
  { id: 1, value: '12312312' },
  { id: 2, value: 'åß∂ƒßå∂ƒ' }
]

const resolvers = {
  Query: {
    getReviews: (_, args) => {
      let reviews = []

      for (let i = 0; i < args['number']; i++) {
        reviews.push({ ...generateReview(args['title']), internalId: Math.floor(Math.random() * 3)})
      }

      return reviews
    }
  },
  Review: {
    metadata: (review) => {
      return internalMetadata.filter(m => m['id'] == review.internalId)[0]
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
