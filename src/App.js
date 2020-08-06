import React from "react";
import RouteApps from "components/RouteApps";
import { Router } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";
import { createBrowserHistory } from "history";
import theme from "./theme";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import "fontsource-roboto";

const browserHistory = createBrowserHistory();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router history={browserHistory}>
        <RouteApps />
      </Router>
    </ThemeProvider>
  );
}

export default App;
