import { Shadows } from "@mui/material"
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
  shadows: [
    "none",
    "0px 2px 4px rgba(0, 0, 0, 0.05)",
    "0px 2px 4px rgba(0, 0, 0, 0.1)",
    "0px 3px 6px rgba(0, 0, 0, 0.1)",
    "0px 4px 8px rgba(0, 0, 0, 0.1)",
    "0px 5px 10px rgba(0, 0, 0, 0.1)",
    "3px 6px 10px rgba(0, 0, 0, 0.1)",
    "2px 7px 15px rgba(0, 0, 0, 0.2)",
    "4px 9px 20px rgba(0, 0, 0, 0.2)",
    "5px 12px 25px rgba(0, 0, 0, 0.2)",
    "6px 15px 30px rgba(0, 0, 0, 0.2)",
    "10px 15px 35px rgba(0, 0, 0, 0.2)",
    "12px 16px 40px rgba(0, 0, 0, 0.2)",
    "14px 17px 45px rgba(0, 0, 0, 0.2)",
    "16px 18px 50px rgba(0, 0, 0, 0.2)",
    "18px 19px 55px rgba(0, 0, 0, 0.2)",
    "20px 21px 60px rgba(0, 0, 0, 0.2)",
    "22px 23px 65px rgba(0, 0, 0, 0.2)",
    "24px 25px 70px rgba(0, 0, 0, 0.2)",
    "26px 27px 75px rgba(0, 0, 0, 0.2)",
    "28px 29px 80px rgba(0, 0, 0, 0.2)",
    "30px 31px 85px rgba(0, 0, 0, 0.2)",
    "32px 33px 90px rgba(0, 0, 0, 0.2)",
    "34px 35px 95px rgba(0, 0, 0, 0.2)",
    "36px 37px 100px rgba(0, 0, 0, 0.2)"
  ] as Shadows,
}

export default theme
