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

export const fetchWeatherData = async (
  city: string
): Promise<OpenWeatherData> => {
  const url = `${process.env.BASE_URL}/weather?q=${city}&appid=${process.env.WEATHER_API_KEY}`
  const res = await fetch(url)
  if (!res.ok) throw new Error("city not found")
  const data: OpenWeatherData = await res.json()
  return data
}
