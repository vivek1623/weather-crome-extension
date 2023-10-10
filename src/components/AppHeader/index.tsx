import React, { useState } from "react"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import TextField from "@mui/material/TextField"
import Switch from "@mui/material/Switch"
import AddIcon from "@mui/icons-material/Add"
import AutoAwesomeMotionOutlinedIcon from "@mui/icons-material/AutoAwesomeMotionOutlined"
import { Typography } from "@mui/material"

import { OpenWeatherTempScale } from "../../utils/api"

const AppHeader: React.FC<{
  tempScale: OpenWeatherTempScale
  onChangeTempScale: (scale: OpenWeatherTempScale) => void
  onAddCity: (city: string) => void
}> = ({ tempScale, onChangeTempScale, onAddCity }) => {
  const [city, setCity] = useState<string>("")

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLImageElement>) => {
    if (e.key === "Enter" && !e.shiftKey && city?.trim().length > 0)
      handleAddCity()
  }

  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value)
  }

  const handleAddCity = () => {
    if (city) {
      setCity("")
      onAddCity(city.toLocaleLowerCase())
    }
  }

  const handleTempScaleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedScale: OpenWeatherTempScale = event.target.checked
      ? "metric"
      : "imperial"
    onChangeTempScale(selectedScale)
  }

  const handleOverlayClick = async () => {
    const tabs = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    })
    if (tabs.length > 0) {
      chrome.tabs.sendMessage(tabs[0].id, {
        type: "toggleOverlay",
      })
    }
  }

  return (
    <Box display="flex" p={1.5}>
      <TextField
        sx={{
          "& .MuiInputBase-root": {
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
            borderTopLeftRadius: 24,
            borderBottomLeftRadius: 24,
          },
          "& .MuiInputBase-input": {
            px: 2,
            py: 0.78,
          },
        }}
        size="small"
        placeholder="Add New City"
        value={city}
        onChange={handleCityChange}
        onKeyDown={handleInputKeyDown}
      />
      <Button
        variant="contained"
        size="small"
        sx={{
          borderTopRightRadius: 24,
          borderBottomRightRadius: 24,
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
          borderLeft: 0,
          minWidth: 50,
          mr: 1,
        }}
        disabled={!city}
        onClick={handleAddCity}
        disableElevation
      >
        <AddIcon />
      </Button>
      <IconButton
        size="small"
        sx={{
          alignSelf: "center",
          border: 1,
          borderColor: "divider",
          boxShadow: 0,
          mr: 1,
        }}
        onClick={handleOverlayClick}
      >
        <AutoAwesomeMotionOutlinedIcon />
      </IconButton>
      <Box
        px={1}
        display="flex"
        alignItems="center"
        border={1}
        borderColor="divider"
        borderRadius={24}
        minWidth={80}
      >
        <Switch
          size="small"
          checked={tempScale === "metric"}
          onChange={handleTempScaleChange}
        />
        <Typography fontWeight="fontWeightBold">
          {tempScale === "metric" ? "℃" : "℉"}
        </Typography>
      </Box>
    </Box>
  )
}

export default AppHeader
