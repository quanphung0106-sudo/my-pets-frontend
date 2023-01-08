import { Box, createTheme, ThemeProvider, Typography, useMediaQuery } from '@mui/material';
import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';

import { routes } from '~/routes';
import GlobalStyles from './components/GlobalStyles';
import { ThemeProviderStyles } from './components/ThemeProvider';

function App() {
  const matches = useMediaQuery('(max-width:600px)');

  const theme = createTheme({
    typography: {
      htmlFontSize: 10,
      fontFamily: ['Nunito', 'sans-serif'].join(','),
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
      {!matches ? (
        <ThemeProvider theme={theme}>
          <ThemeProviderStyles>
            <GlobalStyles>
              <RouterProvider router={routes} />
            </GlobalStyles>
          </ThemeProviderStyles>
        </ThemeProvider>
      ) : (
        <Box padding={2} textAlign="center">
          <Typography variant="h1">
            Giao diện mobile chưa được hỗ trợ. Xin hãy truy cập trang web bằng tablet hoặc laptop. Xin cám ơn.
          </Typography>
        </Box>
      )}
    </div>
  );
}

export default App;
