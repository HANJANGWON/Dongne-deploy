require("dotenv").config();
import { ApolloServer } from "apollo-server-express";
import express from "express";
import logger from "morgan";
import schema from "./schema";
import { getUser } from "./users/users.utils";
import graphqlUploadExpress from "graphql-upload/graphqlUploadExpress.js";
import prisma from "./client";
import pubsub from "./pubsub";
import { createServer } from "http";
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
} from "apollo-server-core";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";

const PORT = process.env.PORT;
const app = express();
const httpServer = createServer(app);
const wsServer = new WebSocketServer({
  server: httpServer,
  path: "/graphql",
});

const startServer = async () => {
  const server = new ApolloServer({
    schema,
    context: async ({ req }) => {
      return {
        loggedInUser: await getUser(req.headers.token),
        prisma,
      };
    },
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
      ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
  });

  const serverCleanup = useServer(
    {
      schema,
      context: async ({ connectionParams }) => {
        console.log(connectionParams);
        if (connectionParams) {
          if (!connectionParams.token) {
            throw new Error("You can't listen.");
          }
          const loggedInUser = await getUser(connectionParams.token);
          return {
            loggedInUser,
          };
        }
      },
    },
    wsServer
  );

  await server.start();
  app.use(logger("tiny"));
  app.use("/static", express.static("src/uploads"));
  app.use(graphqlUploadExpress());

  server.applyMiddleware({ app });
  await new Promise((func: any) => httpServer.listen({ port: PORT }, func));
  console.log(`🚀 Server: http://localhost:${PORT}${server.graphqlPath}`);
};

startServer();
