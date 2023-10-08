import React, { useEffect, useState } from "react"
import Box from "@mui/material/Box"
import Paper from "@mui/material/Paper"
import Skeleton from "@mui/material/Skeleton"
import Typography from "@mui/material/Typography"
import PlaceIcon from "@mui/icons-material/Place"

import { fetchWeatherData } from "../../config/utils"

import CustomCardHeader from "../CustomCardHeader"

const WeatherCard: React.FC<{ city: string }> = ({ city }) => {
  const [loading, setLoading] = useState(false)
  const [weatherData, setWeatherData] = useState(null)

  useEffect(() => {
    setLoading(true)
    fetchWeatherData(city)
      .then((data) => {
        setLoading(false)
        setWeatherData(data)
        console.log(data)
      })
      .catch((err) => {
        setLoading(false)
      })
  }, [])

  const handleDeleteWeather = () => {}

  if (loading)
    return (
      <Paper
        sx={{
          p: 1,
        }}
      >
        <Skeleton variant="rounded" width="40%" />
        <Skeleton variant="text" />
      </Paper>
    )
  else if (!loading && !weatherData)
    return (
      <Paper
        sx={{
          p: 1,
        }}
      >
        <CustomCardHeader
          title={city}
          Icon={PlaceIcon}
          onDelete={handleDeleteWeather}
          deleteProps={{}}
          onEdit={undefined}
        />
        <Typography variant="subtitle2" color="warning">
          Sorry, Unable to find weather information for this location
        </Typography>
      </Paper>
    )
  return (
    <Paper
      sx={{
        p: 1,
      }}
    >
      <CustomCardHeader
        title={weatherData.name}
        Icon={PlaceIcon}
        onDelete={handleDeleteWeather}
        deleteProps={{}}
        onEdit={undefined}
      />
      <Typography variant="h6" fontWeight="fontWeightBold">
        {Math.round(weatherData.main.temp)}
        <Typography variant="caption" ml={1}>
          Feels like {Math.round(weatherData.main.feels_like)}
        </Typography>
      </Typography>
    </Paper>
  )
}

export default WeatherCard
