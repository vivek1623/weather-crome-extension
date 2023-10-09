import React, { useState } from "react"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import TextField from "@mui/material/TextField"
import Switch from "@mui/material/Switch"
import AddIcon from "@mui/icons-material/Add"
import AutoAwesomeMotionOutlinedIcon from "@mui/icons-material/AutoAwesomeMotionOutlined"
import { Typography } from "@mui/material"

import { OpenWeatherTempScale } from "../../config/api"

const SearchHeader: React.FC<{
  tempScale: OpenWeatherTempScale
  onChangeTempScale: (scale: OpenWeatherTempScale) => void
}> = ({ tempScale, onChangeTempScale }) => {
  const [city, setCity] = useState<string>("")

  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value)
  }

  const handleTempScaleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedScale: OpenWeatherTempScale = event.target.checked
      ? "metric"
      : "imperial"
    onChangeTempScale(selectedScale)
  }

  return (
    <Box display="flex" mb={1.5}>
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
        placeholder="Search City"
        value={city}
        onChange={handleCityChange}
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

export default SearchHeader
