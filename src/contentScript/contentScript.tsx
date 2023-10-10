console.log("contentScript running...")
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
import "../config/styles.css"

import themeConfig from "../config/theme"
import { getDataFromLocalStorage } from "../utils/storage"
import { OpenWeatherTempScale } from "../utils/api"

import WeatherCard from "../components/WeatherCard"

const ContentScript: React.FC<{}> = () => {
  const [isActive, setIsActive] = useState<boolean>(false)
  const [homeCity, setHomeCity] = useState<string>("")
  const [tempScale, setTempScale] = useState<OpenWeatherTempScale>("metric")

  let theme = useMemo(() => createTheme(themeConfig), [])
  theme = responsiveFontSizes(theme)

  useEffect(() => {
    getDataFromLocalStorage(["settings", "tempScale"]).then((res) => {
      setIsActive(res?.settings?.hasAutoOverlay || false)
      setHomeCity(res?.settings?.homeCity || "")
      setTempScale(res?.tempScale || "metric")
    })
  }, [])

  useEffect(() => {
    const handleMessageListeners = (payload: {
      type: string
      data?: object
    }) => {
      if (payload.type === "toggleOverlay") {
        setIsActive((prev) => !prev)
      }
    }

    chrome.runtime.onMessage.addListener(handleMessageListeners)
    return () => {
      chrome.runtime.onMessage.removeListener(handleMessageListeners)
    }
  }, [])

  const handleDeleteOverlay = () => setIsActive(false)

  if (!homeCity) return false
  else if (isActive)
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          position="fixed"
          bottom={24}
          right={24}
          minWidth={300}
          sx={{
            zIndex: (theme) => theme.zIndex.appBar + 1,
          }}
        >
          <WeatherCard
            city={homeCity}
            tempScale={tempScale}
            onDelete={handleDeleteOverlay}
            isHomeCity
          />
        </Box>
      </ThemeProvider>
    )

  return false
}

const rootElement = document.createElement("div")
document.body.appendChild(rootElement)
const root = createRoot(rootElement)
root.render(<ContentScript />)
