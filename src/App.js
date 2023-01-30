import { ThemeProvider } from "@mui/material";
import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";

import { routes } from "~/routes";
import GlobalStyles from "./components/GlobalStyles";
import { ThemeProviderStyles } from "./theme_provider";
import theme from "./theme_provider/ThemeProvider";

function App() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <ThemeProviderStyles>
          <GlobalStyles>
            <RouterProvider router={routes} />
          </GlobalStyles>
        </ThemeProviderStyles>
      </ThemeProvider>
    </div>
  );
}

export default App;
