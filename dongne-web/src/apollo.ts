import { createUploadLink } from "apollo-upload-client";
import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { offsetLimitPagination } from "@apollo/client/utilities";

const TOKEN = "token";
const DARK_MODE = "DARK_MODE";

export const isLoggedInVar = makeVar<boolean>(
  Boolean(localStorage.getItem(TOKEN))
);

export const logUserIn = (token: string) => {
  localStorage.setItem(TOKEN, token);
  isLoggedInVar(true);
};

export const logUserOut = (client: ApolloClient<object>) => {
  client.clearStore();
  localStorage.removeItem(TOKEN);
  isLoggedInVar(false);
};

export const darkModeVar = makeVar(Boolean(localStorage.getItem(DARK_MODE)));

export const enableDarkMode = () => {
  localStorage.setItem(DARK_MODE, "enabled");
  darkModeVar(true);
};

export const disableDarkMode = () => {
  localStorage.removeItem(DARK_MODE);
  darkModeVar(false);
};

// const httpLink = createHttpLink({
//   uri: "http://localhost:4000/graphql",
// });

const uploadHttpLink = createUploadLink({
  uri: "http://localhost:4000/graphql",
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      token: localStorage.getItem(TOKEN),
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(uploadHttpLink),
  cache: new InMemoryCache({
    typePolicies: {
      User: {
        keyFields: (obj) => `User:${obj.username}`,
      },
      Query: {
        fields: {
          seeFeed: offsetLimitPagination(),
        },
      },
    },
  }),
});
