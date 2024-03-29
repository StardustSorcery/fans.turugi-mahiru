'use client';
import {
  useEffect,
  useState,
} from "react";
import { usePathname } from "next/navigation";
import {
  Box,
  type BoxProps,
  Tabs,
  type TabsProps,
  alpha,
} from "@mui/material";
import TabNavigationTab from "./TabNavigationTab";
import { navigation } from "@/constants/navigation";

export default function TabNavigation({
  centered = false,
  TabsProps = {},
  ...props
}: BoxProps<
  'div',
  {
    centered?: boolean;
    TabsProps?: TabsProps;
  }
>): React.ReactNode {
  const pathname = usePathname();

  const [ value, setValue ] = useState<string | undefined>(undefined);
  useEffect(() => {
    const targetItem = navigation.find(item => pathname.startsWith(item.href));
    setValue(targetItem?.href || undefined);
  }, [
    pathname,
  ]);

  const [ highlightedItem, setHighlightedItem ] = useState<string | null>(null);

  return (
    <Box
      {...props}
      sx={{
        backgroundColor: theme => theme.palette.background.paper,
        py: 1,
        display: 'flex',
        justifyContent: centered ? 'center' : 'flex-start',
        ...props.sx,
      }}
    >
      <Tabs
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
        TabIndicatorProps={{
          children: <span className="MuiTabs-indicatorSpan" />
        }}
        {...TabsProps}
        sx={{
          '.MuiTabs-indicator': {
            display: 'flex',
            justifyContent: 'center',
            backgroundColor: 'transparent',
          },
          '.MuiTabs-indicatorSpan': {
            width: theme => `calc(100% - ${theme.shape.borderRadius * 2}px)`,
            backgroundColor: theme => theme.palette.mPurple.dark,
          },
          '.MuiTab-root.Mui-selected': {
            color: theme => theme.palette.mPurple.dark,
          },
          ...TabsProps.sx,
        }}
        value={navigation.some(item => item.href === value) && value}
      >
        {navigation.map(item => (
          <TabNavigationTab
            key={item.href}
            labelEN={item.labelEN}
            labelJA={item.labelJA}
            href={item.href}
            value={item.href}
            isHighlighted={highlightedItem === item.href}
            onMouseEnter={() => setHighlightedItem(item.href)}
            onMouseLeave={() => setHighlightedItem(null)}
            onFocus={() => setHighlightedItem(item.href)}
            onBlur={() => setHighlightedItem(null)}
          />
        ))}
      </Tabs>
    </Box>
  );
}
