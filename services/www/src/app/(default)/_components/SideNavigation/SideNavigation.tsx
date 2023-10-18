'use client';
import {
  useEffect,
  useState,
} from 'react';
import { usePathname } from 'next/navigation';
import NextLink from 'next/link';
import {
  Drawer,
  List,
  type DrawerProps,
  Box,
} from "@mui/material";
import { useDefaultContext } from "@/app/(default)/_components/DefaultContext";
import { navigation } from "@/constants/navigation";
import SideNavigationItem from "./SideNavigationItem";

export default function SideNavigation({
  width = 240,
  ...props
}: DrawerProps & {
  width?: number;
}): React.ReactNode {
  const {
    sideNav: {
      isOpen,
      close,
    },
  } = useDefaultContext();

  const pathname = usePathname();

  const [ selectedItem, setSelectedItem ] = useState<string | null>(null);
  useEffect(() => {
    const targetItem = navigation.find(item => pathname.startsWith(item.href));
    setSelectedItem(targetItem?.href || null);
  }, [
    pathname,
  ]);

  // close when navigated
  useEffect(() => {
    close();
  }, [
    pathname,
  ]);

  return (
    <Drawer
      anchor="left"
      {...props}
      sx={{
        '& .MuiDrawer-paper': {
          width,
        },
        ...props.sx
      }}
      open={isOpen}
      onClose={() => {
        close();
      }}
    >
      <Box
        px={2}
        py={1}
        sx={{
          backgroundColor: theme => theme.palette.background.default,
        }}
      >
        <Box
          component={NextLink}
          display="block"
          href="/"
          sx={{
            height: theme => theme.spacing(4),
          }}
        >
          <Box
            component="img"
            display="block"
            src="/_resources/images/name_kanji.png"
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
            }}
          />
        </Box>
      </Box>

      <List
        dense
      >
        {navigation.map(item => (
          <SideNavigationItem
            key={item.href}
            labelEN={item.labelEN}
            labelJA={item.labelJA}
            href={item.href}
            selected={item.href === selectedItem}
          />
        ))}
      </List>
    </Drawer>
  )
}
