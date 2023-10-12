import React, { useMemo, useState, useEffect, useRef } from "react"
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
  const [isDragging, setIsDragging] = useState<boolean>(false)
  const [offset, setOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 })

  const cardRef = useRef(null)

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

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && cardRef.current) {
        const card = cardRef.current
        const x = e.clientX - offset.x
        const y = e.clientY - offset.y
        card.style.transform = `translate(${x}px, ${y}px)`
      }
    }

    const handleMouseUp = () => setIsDragging(false)

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    } else {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging])

  const handleDeleteOverlay = () => setIsActive(false)

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsDragging(true)
    const card = cardRef.current
    if (card) {
      const rect = card.getBoundingClientRect()
      const offsetX = e.clientX - rect.left
      const offsetY = e.clientY - rect.top
      setOffset({ x: offsetX, y: offsetY })
    }
  }

  if (!homeCity) return false
  else if (isActive)
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          ref={cardRef}
          position="fixed"
          top={24}
          right={24}
          minWidth={300}
          sx={{
            zIndex: (theme) => theme.zIndex.modal - 100,
          }}
          onMouseDown={handleMouseDown}
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
