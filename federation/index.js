const { ApolloServer } = require("apollo-server");
const { ApolloGateway, RemoteGraphQLDataSource } = require("@apollo/gateway");

const graphqlApis = [
  { name: "library", url: "http://localhost:3000/graphql" },
  { name: "metadata", url: "http://localhost:4000/graphql" }
];

const gateway = new ApolloGateway({
  serviceList: graphqlApis,
  buildService({ name, url }) {
    return new RemoteGraphQLDataSource({
      url,
      willSendRequest({ request, context }) {
        console.log(context);
        request.http.headers.set("apikey", context.ApiKey);
      }
    });
  }
});

const server = new ApolloServer({
  gateway,
  subscriptions: false,
  context: async ({ req }) => ({
    ApiKey: req.headers["apikey"]
  })
});

server.listen({ port: 5000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
