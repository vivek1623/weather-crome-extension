import React, { useEffect, useState } from "react"
import Paper from "@mui/material/Paper"
import Skeleton from "@mui/material/Skeleton"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"

import {
  fetchWeatherData,
  OpenWeatherTempScale,
  OpenWeatherData,
  getWeatherIconSrc,
} from "../../utils/api"

import CustomCardHeader from "../CustomCardHeader"

const WeatherCard: React.FC<{
  city: string
  tempScale: OpenWeatherTempScale
}> = ({ city, tempScale }) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [weatherData, setWeatherData] = useState<OpenWeatherData | null>(null)

  useEffect(() => {
    setLoading(true)
    fetchWeatherData(city, tempScale)
      .then((data) => {
        setLoading(false)
        setWeatherData(data)
        console.log(data)
      })
      .catch((err) => {
        setLoading(false)
      })
  }, [city, tempScale])

  const handleDeleteWeather = () => {}

  if (loading)
    return (
      <Paper
        sx={{
          px: 1.5,
          py: 1,
          mb: 1
        }}
      >
        <Skeleton variant="rounded" width="40%" />
        <Skeleton variant="text" />
        <Skeleton variant="text" width="70%" />
      </Paper>
    )
  else if (!loading && !weatherData)
    return (
      <Paper
        sx={{
          px: 1.5,
          py: 1,
          mb: 1
        }}
      >
        <CustomCardHeader
          title={city}
          onDelete={handleDeleteWeather}
          deleteProps={{}}
        />
        <Typography variant="subtitle2" color="warning">
          Sorry, Unable to find weather information for this location
        </Typography>
      </Paper>
    )
  return (
    <Paper
      sx={{
        px: 1.5,
        py: 1,
        mb: 1
      }}
    >
      <CustomCardHeader
        title={weatherData.name}
        onDelete={handleDeleteWeather}
        deleteProps={{}}
      />
      <Box display="flex" gap={2.5}>
        {weatherData.weather.length > 0 && (
          <Box
            component="img"
            src={getWeatherIconSrc(weatherData.weather[0].icon)}
            alt="icon"
            height={60}
            width={60}
          />
        )}
        <Box flex={1}>
          <Typography variant="h4" fontWeight="fontWeightBold">
            {Math.round(weatherData.main.temp)}
            <Typography variant="caption" ml={0.25}>
              {tempScale === "metric" ? "℃" : "℉"}
            </Typography>
            {weatherData.weather.length > 0 && (
              <Typography
                component="span"
                variant="h4"
                fontWeight="fontWeightBold"
                ml={2}
              >
                {weatherData.weather[0].main}
              </Typography>
            )}
          </Typography>
          <Typography component="p" variant="caption">
            Feels like {Math.round(weatherData.main.feels_like)}
            {tempScale === "metric" ? "℃" : "℉"}
          </Typography>
        </Box>
      </Box>
    </Paper>
  )
}

export default WeatherCard
