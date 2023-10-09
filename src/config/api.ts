export interface OpenWeatherData {
  name: string
  main: {
    feels_like: number
    humidity: number
    pressure: number
    temp: number
    temp_min: number
    temp_max: number
  }
  weather: {
    id: string
    description: string
    icon: string
    main: string
  }[]
  wind: {
    speed: number
    deg: number
  }
}

export type OpenWeatherTempScale = "metric" | "imperial"

export const fetchWeatherData = async (
  city: string,
  tempScale: OpenWeatherTempScale
): Promise<OpenWeatherData> => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${tempScale}&appid=${process.env.WEATHER_API_KEY}`
  const res = await fetch(url)
  if (!res.ok) throw new Error("city not found")
  const data: OpenWeatherData = await res.json()
  return data
}

export function getWeatherIconSrc(iconCode: string) {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`
}
