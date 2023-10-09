import React, { useMemo, useState } from "react"
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

import { OpenWeatherTempScale } from "../config/api"

import themeConfig from "../config/theme"

import SearchHeader from "../components/SearchHeader"
import WeatherCard from "../components/WeatherCard"

const Popup: React.FC<{}> = () => {
  const [tempScale, setTempScale] = useState<OpenWeatherTempScale>("metric")

  let theme = useMemo(() => createTheme(themeConfig), [])
  theme = responsiveFontSizes(theme)

  const handleTempScaleChange = (scale: OpenWeatherTempScale) => {
    setTempScale(scale)
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box p={1.5} bgcolor="background.default">
        <SearchHeader
          tempScale={tempScale}
          onChangeTempScale={handleTempScaleChange}
        />
        <WeatherCard city="london" tempScale={tempScale} />
      </Box>
    </ThemeProvider>
  )
}

const rootElement = document.createElement("div")
document.body.appendChild(rootElement)
const root = createRoot(rootElement)
root.render(<Popup />)
