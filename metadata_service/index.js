const { ApolloServer, gql } = require("apollo-server");
const generateReview = require("./reviews");
const ImdbAPI = require("./imdb_api");
const { downcaseObject } = require("./utilities");

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

  type MovieMetadata {
    rated: String
    released: String
    runtime: String
    actors: [String]
    ratings: [Rating]
  }

  type Rating {
    source: String
    value: String
  }

  type Reviewer {
    name: String!
    emailAddress: String!
  }

  type Query {
    getReviews(title: String!, number: Int = 5): [Review]
    getMetadata(title: String!): MovieMetadata
  }
`;

const internalMetadata = [
  { id: 0, value: "asdfasdf" },
  { id: 1, value: "12312312" },
  { id: 2, value: "åß∂ƒßå∂ƒ" }
];

const resolvers = {
  Query: {
    getReviews: (_, args) => {
      let reviews = [];

      for (let i = 0; i < args["number"]; i++) {
        reviews.push({
          ...generateReview(args["title"]),
          internalId: Math.floor(Math.random() * 3)
        });
      }

      return reviews;
    },
    getMetadata: async (_, args, { dataSources }) => {
      metadata = await dataSources.imdbApi.getMetadata(args["title"]);
      if (metadata["Response"] !== "False") {
        metadata["Actors"] = metadata["Actors"].split(",").map(a => a.trim());
        metadata["Ratings"] = metadata["Ratings"].map(r => downcaseObject(r));
      }

      return downcaseObject(metadata);
    }
  },
  Review: {
    metadata: review => {
      return internalMetadata.filter(m => m["id"] == review.internalId)[0];
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    imdbApi: new ImdbAPI()
  })
});

server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`Server running at ${url}`);
});
