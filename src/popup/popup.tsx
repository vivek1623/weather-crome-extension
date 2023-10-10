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

import AppHeader from "../components/AppHeader"
import WeatherCard from "../components/WeatherCard"

const Popup: React.FC<{}> = () => {
  const [tempScale, setTempScale] = useState<OpenWeatherTempScale>("metric")
  const [cities, setCities] = useState<string[]>([])
  const [homeCity, setHomeCity] = useState<string>("")

  useEffect(() => {
    getDataFromLocalStorage(["cities", "tempScale", "settings"]).then((res) => {
      setCities(res?.cities || [])
      setTempScale(res?.tempScale || "metric")
      setHomeCity(res?.settings?.homeCity || "")
    })
  }, [])

  let theme = useMemo(() => createTheme(themeConfig), [])
  theme = responsiveFontSizes(theme)

  const handleTempScaleChange = (scale: OpenWeatherTempScale) => {
    setDataInLocalStorage("tempScale", scale).then(() => setTempScale(scale))
  }

  const handleAddCity = (city: string) => {
    if (city && homeCity && city === homeCity) return
    const index = cities.findIndex((c) => c === city)
    if (index !== -1) return
    const updatedCities = [...cities, city]
    setDataInLocalStorage("cities", updatedCities).then(() =>
      setCities(updatedCities)
    )
  }

  const handleCardDelete = (city: string) => {
    const updatedCities = cities.filter((c) => c !== city)
    setDataInLocalStorage("cities", updatedCities).then(() =>
      setCities(updatedCities)
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        height="100%"
        display="flex"
        flexDirection="column"
        bgcolor="background.paper"
      >
        <AppHeader
          tempScale={tempScale}
          onChangeTempScale={handleTempScaleChange}
          onAddCity={handleAddCity}
        />
        <Box
          flex={1}
          overflow="auto"
          mx={1}
          mb={1}
          p={1.5}
          bgcolor="background.default"
          borderRadius={1}
          boxShadow={(theme) => `${theme.shadows[2]} inset`}
        >
          {homeCity && (
            <WeatherCard city={homeCity} tempScale={tempScale} isHomeCity />
          )}
          {cities?.map((city) => (
            <WeatherCard
              key={city}
              city={city}
              tempScale={tempScale}
              onDelete={handleCardDelete}
            />
          ))}
        </Box>
      </Box>
    </ThemeProvider>
  )
}

const rootElement = document.createElement("div")
rootElement.style.height = "100%"
document.body.appendChild(rootElement)
const root = createRoot(rootElement)
root.render(<Popup />)
