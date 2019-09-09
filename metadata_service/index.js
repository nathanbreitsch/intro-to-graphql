const { ApolloServer, gql } = require("apollo-server");
const { buildFederatedSchema } = require("@apollo/federation");
const { getMetadata, getReviews } = require("./data");

const typeDefs = gql`
  type Review @key(fields: id) {
    id: ID!
    rating: Int!
    comment: String!
    reviewer: Reviewer!
    metadata: ReviewMetadata!
  }

  type ReviewMetadata {
    value: String!
  }

  type MovieMetadata {
    rated: String
    released: String
    runtime: String
    actors: [String]
    ratings: [Rating]
  }

  extend type Movie @key(fields: id) {
    id: ID! @external
    title: String! @external
    reviews(number: Int): [Review] @requires(fields: "title")
    metadata: MovieMetadata @requires(fields: "title")
  }

  type Rating {
    source: String
    value: String
  }

  type Reviewer {
    name: String!
    emailAddress: String!
  }
`;

const internalMetadata = [
  { id: 0, value: "asdfasdf" },
  { id: 1, value: "12312312" },
  { id: 2, value: "åß∂ƒßå∂ƒ" }
];

const resolvers = {
  Movie: {
    reviews: getReviews(5),
    metadata: getMetadata
  },
  Review: {
    metadata(review) {
      return internalMetadata.filter(m => m["id"] == review.internalId)[0];
    }
  }
};

const server = new ApolloServer({
  schema: buildFederatedSchema([
    {
      typeDefs,
      resolvers
    }
  ])
});

server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`Server running at ${url}`);
});
