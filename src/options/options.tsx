import React, { useMemo } from "react"
import { createRoot } from "react-dom/client"
import {
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import Container from "@mui/material/Container"
import Paper from "@mui/material/Paper"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"

import "../config/common"
import "./options.css"
import "../config/styles.css"

import themeConfig from "../config/theme"

const Options: React.FC<{}> = () => {
  let theme = useMemo(() => createTheme(themeConfig), [])
  theme = responsiveFontSizes(theme)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm">
        <Paper sx={{ p: 2, my: 4 }}>
          <Box
            component="img"
            src="./images/icon-128.png"
            alt="weather"
            height={100}
            display="block"
            mx="auto"
            my={2}
          />
          <Typography variant="h4" align="center" fontWeight="fontWeightMedium">
            Weather
          </Typography>
          <Typography
            component="p"
            align="center"
            color="text.secondary"
            mb={4}
          >
            Access Weather Updates for Any Location Simply by Name
          </Typography>
          <TextField
            size="small"
            placeholder="Enter your home city name"
            fullWidth
          />
          <Box pt={4} display="flex" justifyContent="center">
            <Button variant="contained">Save</Button>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  )
}

const rootElement = document.createElement("div")
document.body.appendChild(rootElement)
const root = createRoot(rootElement)
root.render(<Options />)
