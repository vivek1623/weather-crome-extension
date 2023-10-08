import React, { useMemo } from "react"
import { createRoot } from "react-dom/client"
import {
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import Box from "@mui/material/Box"

import "../config/common"
import "./popup.css"
import "../config/styles.css"

import themeConfig from "../config/theme"

import SearchHeader from "../components/SearchHeader"
import WeatherCard from "../components/WeatherCard"

const Popup: React.FC<{}> = () => {
  let theme = useMemo(() => createTheme(themeConfig), [])
  theme = responsiveFontSizes(theme)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box p={1.5} bgcolor="background.default">
        <SearchHeader />
        <WeatherCard city="London" />
      </Box>
    </ThemeProvider>
  )
}

const rootElement = document.createElement("div")
document.body.appendChild(rootElement)
const root = createRoot(rootElement)
root.render(<Popup />)
