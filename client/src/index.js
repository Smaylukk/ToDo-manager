import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import UserStore from "./store/UserStore";
import { ApolloProvider } from "@apollo/client";
import client from "./graphql/client";

export const Context = React.createContext(null);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Context.Provider
      value={{
        user: new UserStore(),
      }}
    >
      <ChakraProvider>
        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
      </ChakraProvider>
    </Context.Provider>
  </React.StrictMode>
);
