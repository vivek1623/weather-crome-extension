import React, { useMemo, useState, useEffect } from "react"
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

import { OpenWeatherTempScale } from "../utils/api"
import {
  getDataFromLocalStorage,
  setDataInLocalStorage,
} from "../utils/storage"

import themeConfig from "../config/theme"

import SearchHeader from "../components/SearchHeader"
import WeatherCard from "../components/WeatherCard"

const Popup: React.FC<{}> = () => {
  const [tempScale, setTempScale] = useState<OpenWeatherTempScale>("metric")
  const [cities, setCities] = useState<string[]>([])

  useEffect(() => {
    getDataFromLocalStorage(["cities"]).then((res) => {
      setCities(res.cities || [])
    })
  }, [])

  let theme = useMemo(() => createTheme(themeConfig), [])
  theme = responsiveFontSizes(theme)

  const handleTempScaleChange = (scale: OpenWeatherTempScale) => {
    setTempScale(scale)
  }

  const handleAddCity = (city: string) => {
    const updatedCities = [...cities, city]
    setDataInLocalStorage("cities", updatedCities).then(() =>
      setCities(updatedCities)
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box p={1.5} bgcolor="background.default">
        <SearchHeader
          tempScale={tempScale}
          onChangeTempScale={handleTempScaleChange}
          onAddCity={handleAddCity}
        />
        {cities?.map((city, index) => (
          <WeatherCard key={index} city={city} tempScale={tempScale} />
        ))}
      </Box>
    </ThemeProvider>
  )
}

const rootElement = document.createElement("div")
document.body.appendChild(rootElement)
const root = createRoot(rootElement)
root.render(<Popup />)
