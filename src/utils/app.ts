const OPEN_WEATHER_API_KEY: string = '7226bfa91573442da167dd0e9c4242be'

export interface OpenWeatherData {
  name: string
  main: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    humidity: number
    sea_level: number
    grnd_level: number
  }
  weather: { description: string; main: string; id: number; icon: string }[]
  wind: { speed: number; deg: number }
}

export async function fetchOpenWeatherData(
  city: string
): Promise<OpenWeatherData> {
  const res = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPEN_WEATHER_API_KEY}&units=metric`
  )
  if (!res.ok) {
    throw new Error(`Could not fetch weather for ${city}`)
  }
  return await res.json()
}
