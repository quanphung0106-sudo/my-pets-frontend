import { createTheme, ThemeProvider } from "@mui/material";
import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";

import { routes } from "~/routes";
import GlobalStyles from "./components/GlobalStyles";
import { ThemeProviderStyles } from "./components/ThemeProvider";

function App() {
  const theme = createTheme({
    typography: {
      htmlFontSize: 10,
      fontFamily: ["Nunito", "sans-serif"].join(","),
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536,
      },
    },
  });

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
