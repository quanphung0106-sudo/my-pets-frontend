import { StyledEngineProvider } from "@mui/material";

export const ThemeProviderStyles = ({children}) => {
  return <StyledEngineProvider injectFirst>{children}</StyledEngineProvider>;
};
