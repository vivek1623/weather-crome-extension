import React, { ReactNode } from "react"
import Box, { BoxProps } from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { IconButtonOwnProps } from "@mui/material/IconButton"

import DeleteIconButton from "../DeleteIconButton"

interface CustomCardHeaderProps extends BoxProps {
  title: string
  deleteProps: IconButtonOwnProps
  children?: React.ReactNode
  onDelete?: () => void | undefined
}

const CustomCardHeader: React.FC<CustomCardHeaderProps> = ({
  title,
  onDelete,
  deleteProps,
  children,
  ...restProps
}) => {
  return (
    <Box
      mb={0.5}
      display="flex"
      justifyContent="space-between"
      pr={6}
      position="relative"
      {...restProps}
    >
      <Box position="absolute" top={0} right={0}>
        {children}
        {onDelete && (
          <DeleteIconButton
            title="Delete this city information"
            description="Are you sure want to delete this city"
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
