import { GraphQLServer } from "graphql-yoga";
import { addMockFunctionsToSchema } from "graphql-tools";

import schema from "./schema";

if (process.env.MOCK) addMockFunctionsToSchema({ schema });

const options = {
  port: 8080,
  endpoint: "/graphql",
  subscriptions: "/subscriptions",
  playground: "/playground"
};
const server = new GraphQLServer({ schema });

server.start(options, () =>
  console.log("Server is running on localhost:" + options.port)
);
