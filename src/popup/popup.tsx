import React, { useEffect, useState } from "react"
import { createRoot } from "react-dom/client"

import "./popup.css"
import { fetchWeatherData } from "../config/utils"

const Popup: React.FC<{}> = () => {
  const [loading, setLoading] = useState(false)
  const [weatherData, setWeatherData] = useState(null)

  useEffect(() => {
    setLoading(true)
    fetchWeatherData("patna")
      .then(data => {
        console.log("data", data)
        setLoading(false)
      })
      .catch(err => {
        console.log("err", err)
        setLoading(false)
      })
  }, [])

  return (
    <div>
      <p>Hello popup</p>
    </div>
  )
}

const rootElement = document.createElement("div")
document.body.appendChild(rootElement)
const root = createRoot(rootElement)
root.render(<Popup />)
