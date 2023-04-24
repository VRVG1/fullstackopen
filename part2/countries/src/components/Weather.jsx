import { useEffect, useState } from "react"
import axios from "axios"

const Weather = ({ city }) => {
  const KEY = import.meta.env.VITE_APP_API_KEY
  const [weather, setWeather] = useState({})

  const hook = () => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${KEY}&query=${city}`
      )
      .then((response) => {
        setWeather({
          temperature: response.data.current.temperature,
          img: response.data.current.weather_icons,
          wind: response.data.current.wind_speed,
          direction: response.data.current.wind_dir,
          img_description: response.data.current.weather_descriptions,
        })
      })
  }

  useEffect(hook, [])

  return (
    <>
      {weather !== undefined ? (
        <div>
          <h2>Weather in {city}</h2>
          <div>
            <strong>Temperature</strong> {weather.temperature}°C
          </div>
          <img src={weather.img} />
          <div>
            <strong>Wind</strong> {weather.wind}km/h direction{" "}
            {weather.direction}
          </div>
        </div>
      ) : null}
    </>
  )
}
export default Weather
