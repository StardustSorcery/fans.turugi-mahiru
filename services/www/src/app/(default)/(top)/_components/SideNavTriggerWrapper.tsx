'use client';
import {
  useMediaQuery,
} from "@mui/material";
import SideNavTrigger from "@/app/(default)/_components/SideNavigation/SideNavTrigger";

export default function SideNavTriggerWrapper() {
  const isMobile = useMediaQuery('(max-width:809px)'); // iPad 7 縦向き未満をモバイル判定

  return isMobile ? (
    <SideNavTrigger
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: theme => theme.zIndex.drawer - 1,
        backgroundColor: theme => theme.palette.mBlue.main,
        color: theme => theme.palette.mBlue.contrastText,
        borderBottomRightRadius: theme => `${theme.shape.borderRadius}px`,
      }}
    />
  ) : (
    <></>
  );
}
