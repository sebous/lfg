import React from "react";
import { AppLayout } from "./layout/AppLayout";
import { Router } from "./routes/Router";
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import { client } from "../common/apolloClient";

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <AppLayout>
          <Router />
        </AppLayout>
      </BrowserRouter>
    </ApolloProvider>
  );
};

export default App;
