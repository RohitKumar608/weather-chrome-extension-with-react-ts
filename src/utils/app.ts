const OPEN_WEATHER_API_KEY: string = '7226bfa91573442da167dd0e9c4242be'

export async function fetchOpenWeatherData(city: string): Promise<any> {
  const res = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPEN_WEATHER_API_KEY}&units=metric`
  )
  if (!res.ok) {
    throw new Error(`Could not fetch weather for ${city}`)
  }
  return await res.json()
}
