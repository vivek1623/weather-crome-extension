import React, { useState } from "react"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import IconButton, { IconButtonOwnProps } from "@mui/material/IconButton"
import Popover from "@mui/material/Popover"
import DeleteIcon from "@mui/icons-material/Delete"
import ErrorIcon from "@mui/icons-material/Error"
import Typography from "@mui/material/Typography"

interface DeleteIconButtonProps extends IconButtonOwnProps {
  title: string
  description: string
  onDelete: () => void
}

const DeleteIconButton: React.FC<DeleteIconButtonProps> = ({
  title,
  description,
  onDelete,
  ...restProps
}) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const id = open ? "vg-delete-icon-button" : undefined

  const handleButtonClick = (e) => {
    setAnchorEl(e.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleConfirmation = () => {
    handleClose()
    onDelete()
  }

  return (
    <>
      <IconButton {...restProps} onClick={handleButtonClick}>
        <DeleteIcon fontSize="inherit" />
      </IconButton>
      <Popover
        id={id}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            sx: {
              p: 2,
              display: "flex",
            },
          },
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <ErrorIcon color="error" fontSize="medium" />
        <Box pl={1}>
          <Typography variant="subtitle2">{title}</Typography>
          <Typography mb={1} variant="subtitle2" fontWeight="fontWeightRegular">
            {description}
          </Typography>
          <Button
            variant="contained"
            size="small"
            sx={{ mr: 1 }}
            onClick={handleClose}
            disableElevation
          >
            No
          </Button>
          <Button
            variant="outlined"
            size="small"
            color="error"
            onClick={handleConfirmation}
            disableElevation
          >
            Yes
          </Button>
        </Box>
      </Popover>
    </>
  )
}

DeleteIconButton.defaultProps = {
  title: "Delete this item",
  description: "Are you sure to delete this item?",
}

export default DeleteIconButton
