require("dotenv").config();
const express = require("express");
const { ApolloServer, ApolloError,UserInputError, gql } = require("apollo-server-express");
const connectDb = require("./config/db");
const models = require("./models");

connectDb();

const typeDefs = gql`
  type Project {
    id: ID!
    title: String!
    body: String!
    year: Int!
    summary: String!
    role: String!
    referrerUrl: String
    thumbnailUrl: String!
    imageTwoUrl: String
    imageThreeUrl: String
    videoUrl: String
  }

  type Query {
    projects: [Project!]!
    project(id: ID!): Project!
  }
`;

const resolvers = {
  Query: {
    projects: async (_, {}, { models }) => {
      return await models.Project.find();
    },
    project: async (_, { id }, { models }) => {
      if (id.match(/^[0-9a-fA-F]{24}$/)) {
        const project = await models.Project.findOne({ _id: id });

        if (!project)
          throw new ApolloError(
            `Could not find project with id: '${id}'.`,
            400
          );
        else return project;
      } else {
        throw new UserInputError(
            `ID is incorrectly formatted.`,
            400
        );
      }
    },
  },
};

const app = express();
const path = "/graphql";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: { models },
  cacheControl: {
    defaultMaxAge: 240,
  },
});

server.applyMiddleware({ app, path });

app.listen({ port: process.env.PORT || 4000 }, () => {
  console.log(`🚀 Go to http://localhost:4000/graphql to run queries!`);
});
