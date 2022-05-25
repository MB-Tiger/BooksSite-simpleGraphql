import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import MyRoutes from "./router/MyRoutes";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <React.StrictMode>
        <MyRoutes />
      </React.StrictMode>
    </ApolloProvider>
  </BrowserRouter>
);

reportWebVitals();
