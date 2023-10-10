import React, { useMemo, useState, useEffect } from "react"
import { createRoot } from "react-dom/client"
import { SnackbarProvider, closeSnackbar, enqueueSnackbar } from "notistack"
import {
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import Container from "@mui/material/Container"
import Paper from "@mui/material/Paper"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import FormControl from "@mui/material/FormControl"
import FormLabel from "@mui/material/FormLabel"
import FormControlLabel from "@mui/material/FormControlLabel"
import Switch from "@mui/material/Switch"
import IconButton from "@mui/material/IconButton"
import SaveIcon from "@mui/icons-material/Save"
import CloseIcon from "@mui/icons-material/Close"

import "../config/common"
import "./options.css"
import "../config/styles.css"

import themeConfig from "../config/theme"
import {
  Settings,
  getDataFromLocalStorage,
  setDataInLocalStorage,
} from "../utils/storage"

const Options: React.FC<{}> = () => {
  const [isChanged, setIsChanged] = useState<boolean>(false)
  const [settings, setSettings] = useState<Settings>({
    homeCity: "",
    hasAutoOverlay: false,
  })

  let theme = useMemo(() => createTheme(themeConfig), [])
  theme = responsiveFontSizes(theme)

  useEffect(() => {
    getDataFromLocalStorage(["settings"])
      .then((res) => {
        if (res.settings) setSettings(res.settings)
      })
      .catch((err) => {
        console.error(err)
        enqueueSnackbar("Sorry unable to loaded default data", {
          variant: "error",
        })
      })
  }, [])

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings((prev) => ({
      ...prev,
      homeCity: e.target.value,
    }))
    if (!isChanged) setIsChanged(true)
  }

  const handleAutoOverlayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings((prev) => ({
      ...prev,
      hasAutoOverlay: e.target.checked,
    }))
    if (!isChanged) setIsChanged(true)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setDataInLocalStorage("settings", settings)
      .then(() => {
        setIsChanged(false)
        enqueueSnackbar("Settings updated successfully", { variant: "success" })
      })
      .catch((err) => {
        console.error(err)
        enqueueSnackbar("Something went wrong", { variant: "error" })
      })
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider
        style={{
          maxWidth: 320,
        }}
        autoHideDuration={2000}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        action={(snackbarId) => (
          <IconButton size="small" onClick={() => closeSnackbar(snackbarId)}>
            <CloseIcon fontSize="inherit" />
          </IconButton>
        )}
        preventDuplicate
      />
      <Container maxWidth="sm">
        <Paper
          sx={{ p: 2, my: 4 }}
          component="form"
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <Box
            component="img"
            src="./images/icon-128.png"
            alt="weather"
            height={100}
            display="block"
            mx="auto"
            my={2}
          />
          <Typography variant="h4" align="center" fontWeight="fontWeightMedium">
            Weather
          </Typography>
          <Typography
            component="p"
            align="center"
            color="text.secondary"
            mb={4}
          >
            Access Weather Updates for Any Location Simply by Name
          </Typography>
          <FormControl margin="normal" fullWidth required>
            <FormLabel sx={{ mb: 0.5 }}>Home City Name</FormLabel>
            <TextField
              size="small"
              placeholder="Enter city name"
              variant="outlined"
              value={settings.homeCity}
              onChange={handleCityChange}
              fullWidth
              required
            />
          </FormControl>
          <FormControl margin="normal">
            <FormControlLabel
              control={
                <Switch
                  checked={settings.hasAutoOverlay}
                  onChange={handleAutoOverlayChange}
                />
              }
              label="Auto toggle overlay on webpage"
            />
          </FormControl>
          <Box pt={6} pb={2} display="flex" justifyContent="center">
            <Button
              type="submit"
              variant="contained"
              startIcon={<SaveIcon />}
              disabled={!isChanged}
            >
              Save Settings
            </Button>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  )
}

const rootElement = document.createElement("div")
document.body.appendChild(rootElement)
const root = createRoot(rootElement)
root.render(<Options />)
