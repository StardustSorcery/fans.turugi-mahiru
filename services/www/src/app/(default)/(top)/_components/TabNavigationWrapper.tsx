'use client';
import {
  useMediaQuery,
} from "@mui/material";
import TabNavigation from "@/components/TabNavigation/TabNavigation";

export default function TabNavigationWrapper() {
  const isMobile = useMediaQuery('(max-width:809px)'); // iPad 7 縦向き未満をモバイル判定

  return isMobile ? (
    <></>
  ) : (
    <TabNavigation
      centered
    />
  );
}
