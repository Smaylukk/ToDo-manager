import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: process.env.REACT_APP_API_URL || "",
  cache: new InMemoryCache(),
  headers: {
    authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export default client;
