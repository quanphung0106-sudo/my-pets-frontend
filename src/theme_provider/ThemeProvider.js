const { createTheme } = require("@mui/material");

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
  components: {
    MuiDataGrid: {
      styleOverrides: {
        root: {
          "&.MuiDataGrid-root": {
            width: "100%",
            "& 	.MuiDataGrid-cell": {
              "&:focus-within, &:focus": { outline: "none" },
            },
            "& .MuiDataGrid-checkboxInput": {
              "&  svg": {
                fill: "var(--pink_100)",
              },
            },
            "& 	.MuiDataGrid-columnHeaderTitle": {
              fontWeight: "bold",
              fontSize: "1.6rem",
            },
            "& .MuiDataGrid-columnHeader": {
              backgroundColor: "var(--pink_light)",
              color: "var(--white)",
              "& 	.MuiDataGrid-columnSeparator": {
                visibility: "hidden",
              },
              "& .MuiDataGrid-checkboxInput": {
                "&  svg": {
                  fill: "white",
                },
              },
            },
            "& .MuiDataGrid-row": {
              "&:nth-of-type(even)": {
                backgroundColor: "#f0919623",
              },
              "&:hover": {
                backgroundColor: "#f0919675",
                cursor: "pointer",
              },
            },
            "& .MuiDataGrid-cell, & .MuiDataGrid-columnHeader": {
              "&:focus, &:focus-within": {
                outline: "none",
              },
            },
          },
        },
      },
    },
  },
});

export default theme;
