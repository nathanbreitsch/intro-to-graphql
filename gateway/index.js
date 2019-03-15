const {
  makeRemoteExecutableSchema,
  introspectSchema,
  mergeSchemas
} = require('graphql-tools')
const { HttpLink } = require('apollo-link-http')
const { ApolloServer, gql } = require('apollo-server')
const fetch = require('node-fetch')

const graphqlApis = [
  { name: 'library', uri:  'http://localhost:3000/graphql' },
  { name: 'metadata', uri: 'http://localhost:4000/graphql' }
]

const createRemoteExecutableSchemas = async () => {
  let schemas = {}

  for (const api of graphqlApis) {
    const link = new HttpLink({
      uri: api.uri,
      fetch
    })

    const remoteSchema = await introspectSchema(link)
    const remoteExecutableSchema = makeRemoteExecutableSchema({
      schema: remoteSchema,
      link
    })

    schemas[api.name] = remoteExecutableSchema
  }

  return schemas
}

const createSchema = async () => {
  const remoteSchemas = await createRemoteExecutableSchemas()

  const schemas = Object.values(remoteSchemas)

  return mergeSchemas({
    schemas
  })
}

const runServer = async () => {
  const schema = await createSchema()

  const server = new ApolloServer({
    schema
  })

  server.listen({ port: 5000 }).then(({ url }) => {
    console.log(`Running gateway at ${url}`)
  })
}

runServer()
