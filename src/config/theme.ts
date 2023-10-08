declare module "@mui/material/styles"

const theme = {
  palette: {
    primary: {
      main: "#b660e0",
    },
    secondary: {
      main: "#0ca975",
    },
    text: {
      primary: "#383738",
    },
    background: {
      default: "#f8f8f8",
    },
  },
  components: {
    MuiChip: {
      styleOverrides: {
        root: {
          borderTopRightRadius: 2,
          borderBottomRightRadius: 2,
        },
      },
    },
  },
  shape: {
    borderRadius: 4,
  },
}

export default theme
