import React, { useState } from "react"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import TextField from "@mui/material/TextField"
import AddIcon from "@mui/icons-material/Add"
import AutoAwesomeMotionOutlinedIcon from "@mui/icons-material/AutoAwesomeMotionOutlined"
import DeviceThermostatOutlinedIcon from "@mui/icons-material/DeviceThermostatOutlined"

const SearchHeader: React.FC<{}> = () => {
  const [city, setCity] = useState("")

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value)
  }

  return (
    <Box display="flex" mb={1.5}>
      <TextField
        sx={{
          "& .MuiInputBase-root": {
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
            borderTopLeftRadius: 24,
            borderBottomLeftRadius: 24,
          },
          "& .MuiInputBase-input": {
            px: 2,
            py: 0.75,
          },
        }}
        size="small"
        placeholder="Search City Name"
        value={city}
        onChange={handleChange}
      />
      <Button
        variant="contained"
        size="small"
        sx={{
          borderTopRightRadius: 24,
          borderBottomRightRadius: 24,
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
          minWidth: 24,
          mr: 1,
        }}
        disabled={!city}
        disableElevation
      >
        <AddIcon />
      </Button>
      <IconButton
        size="small"
        sx={{ alignSelf: "center", boxShadow: 2, mr: 1 }}
      >
        <DeviceThermostatOutlinedIcon />
      </IconButton>
      <IconButton size="small" sx={{ alignSelf: "center", boxShadow: 2 }}>
        <AutoAwesomeMotionOutlinedIcon />
      </IconButton>
    </Box>
  )
}

export default SearchHeader
