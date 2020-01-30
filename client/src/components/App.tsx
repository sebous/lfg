import React from "react";
import { AppLayout } from "./layout/AppLayout";
import { Router } from "./routes/Router";
import { BrowserRouter } from "react-router-dom";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppLayout>
        <Router />
      </AppLayout>
    </BrowserRouter>
  );
};

export default App;
