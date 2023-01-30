import { StyledEngineProvider } from "@mui/material";

//StyledEngineProvider injectFirst removes the need for !important
//which gives our custom styles precedence over MUI.
export const ThemeProviderStyles = ({ children }) => {
  return <StyledEngineProvider injectFirst>{children}</StyledEngineProvider>;
};
