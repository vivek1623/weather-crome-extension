import { OpenWeatherTempScale, fetchWeatherData } from "../utils/api"
import {
  getDataFromLocalStorage,
  setDataInLocalStorage,
} from "../utils/storage"

console.log("background is listening")

chrome.runtime.onInstalled.addListener(() => {
  setDataInLocalStorage("cities", [])
  setDataInLocalStorage("tempScale", "metric")
  setDataInLocalStorage("settings", {
    hasAutoOverlay: false,
    homeCity: "",
  })

  chrome.alarms.create("weather-home-city-alarm", {
    periodInMinutes: 1,
  })

  chrome.contextMenus.create({
    id: "weather-extension",
    title: "Add city to weather extension",
    contexts: ["selection"],
  })
})

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "weather-home-city-alarm") {
    getDataFromLocalStorage(["settings", "tempScale"]).then((res) => {
      if (!res?.settings?.homeCity) return
      const tempScale: OpenWeatherTempScale =
        res.tempScale === "metric" ? "metric" : "imperial"

      fetchWeatherData(res.settings.homeCity, tempScale).then((data) => {
        if (data?.main) {
          const temp = Math.round(data.main.temp)
          const symbol = tempScale === "metric" ? "℃" : "℉"
          chrome.action.setBadgeText({
            text: `${temp}${symbol}`,
          })
        }
      })
    })
  }
})

chrome.contextMenus.onClicked.addListener((e) => {
  if (e.selectionText?.trim()?.length > 0) {
    getDataFromLocalStorage(["cities"]).then((res) => {
      if (!res?.cities?.includes(e.selectionText)) {
        setDataInLocalStorage("cities", [e.selectionText, ...res.cities])
      }
    })
  }
})
