'use client';
import {
  Box,
  type BoxProps,
  IconButton,
} from "@mui/material";
import { Menu } from "@mui/icons-material";
import { useDefaultContext } from "@/app/(default)/_components/DefaultContext";

export default function SideNavTrigger({
  ...props
}: BoxProps): React.ReactNode {
  const {
    sideNav: {
      open: openSideNav,
    },
  } = useDefaultContext();

  return (
    <Box
      display="inline-block"
      p={1}
      {...props}
      sx={{
        ...props.sx,
      }}
    >
      <IconButton
        color="inherit"
        onClick={() => {
          openSideNav();
        }}
      >
        <Menu
        />
      </IconButton>
    </Box>
  );
}
