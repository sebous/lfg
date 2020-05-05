import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import { ThemeProvider } from "styled-components";
import { AppLayout } from "./layout/AppLayout";
import { Router } from "./routes/Router";
import { client } from "../common/apolloClient";
import { theme, GlobalStyles } from "./ui/theme";

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <AppLayout>
            <Router />
          </AppLayout>
        </ThemeProvider>
      </BrowserRouter>
    </ApolloProvider>
  );
};

export default App;
