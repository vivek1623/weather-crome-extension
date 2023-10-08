import React from "react"
import Box, { BoxProps } from "@mui/material/Box"
import { IconProps } from "@mui/material"
import Typography from "@mui/material/Typography"
import IconButton, { IconButtonOwnProps } from "@mui/material/IconButton"
import EditIcon from "@mui/icons-material/Edit"

import DeleteIconButton from "../DeleteIconButton"

interface CustomCardHeaderProps extends BoxProps {
  title: string
  Icon: React.FC<IconProps>
  deleteProps: IconButtonOwnProps
  onDelete: () => void
  onEdit: () => void
}

const CustomCardHeader: React.FC<CustomCardHeaderProps> = ({
  Icon,
  title,
  onEdit,
  onDelete,
  deleteProps,
  ...restProps
}) => {
  return (
    <Box
      mb={0.5}
      display="flex"
      justifyContent="space-between"
      pl={Icon ? 3 : 0}
      pr={8}
      position="relative"
      {...restProps}
    >
      <Icon
        sx={{
          fontSize: "h5.fontSize",
          position: "absolute",
          left: 0,
          top: 0,
          mr: 1,
          verticalAlign: "middle",
        }}
      />
      <Box position="absolute" top={0} right={0}>
        {onEdit && (
          <IconButton
            size="small"
            aria-label="edit"
            sx={{
              color: "inherit",
            }}
            onClick={onEdit}
          >
            <EditIcon fontSize="inherit" />
          </IconButton>
        )}
        {onDelete && (
          <DeleteIconButton
            title="Delete this information"
            description="Are you sure want to delete this weather information"
            aria-label="delete"
            size="small"
            sx={{
              color: "inherit",
            }}
            {...deleteProps}
            onDelete={onDelete}
          />
        )}
      </Box>
      <Typography
        variant="subtitle2"
        textTransform="uppercase"
        sx={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {title}
      </Typography>
    </Box>
  )
}

export default CustomCardHeader
