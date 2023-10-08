import React, { useMemo } from "react"
import { createRoot } from "react-dom/client"
import {
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import Paper from "@mui/material/Paper"
import Container from "@mui/material/Container"

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
        <Paper sx={{ p: 2, my: 4 }}>hello options</Paper>
      </Container>
    </ThemeProvider>
  )
}

const rootElement = document.createElement("div")
document.body.appendChild(rootElement)
const root = createRoot(rootElement)
root.render(<Options />)
