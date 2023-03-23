import { ApolloServer } from "apollo-server-express";
import schema from "../../schema";
import prisma from "../../client";

const testServer = new ApolloServer({
  schema,
  context: async () => {
    return {
      prisma,
    };
  },
});

const user = {
  id: 1,
  username: "tes",
  email: "test@test.com",
  password: "123",
  bio: "test",
  avatar: "test",
  isManager: false,
  createdAt: new Date(),
  updatedAt: new Date(),
};

beforeEach(() => {});

it("create user", async () => {
  const result = await testServer.executeOperation({
    query: `
    mutation($username: String!, $email: String!, $password: String!) {
      createAccount( username: $username, email: $email, password: $password) {
        ok
      }
    }`,
    variables: {
      username: "test",
      email: "test2@test.com",
      password: "1234",
    },
  });

  expect(result.data?.createAccount).toEqual({
    ok: true,
  });
});
