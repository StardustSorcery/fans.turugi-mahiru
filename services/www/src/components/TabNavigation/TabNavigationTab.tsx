import {
  useState,
} from 'react';
import NextLink, {
  LinkProps as NextLinkProps,
} from 'next/link';
import {
  Tab,
  alpha,
  type TabProps,
  Typography,
  Stack,
} from "@mui/material";

export default function TabNavigationTab({
  label,
  labelEN,
  labelJA,
  isHighlighted = false,
  ...props
}: TabProps<
  'a',
  NextLinkProps & {
    label?: string;
    labelEN?: string;
    labelJA?: string;
    isHighlighted?: boolean;
  }
>): React.ReactNode {
  return (
    <Tab
      component={NextLink}
      tabIndex={0}
      label={(labelEN && labelJA) ? (
        <Stack
        >
          <Typography
            component="span"
            display="block"
            sx={{
              fontSize: theme => theme.typography.h5.fontSize,
              fontWeight: theme => theme.typography.fontWeightBold,
            }}
          >
            {labelEN}
          </Typography>

          <Typography
            component="span"
            display="block"
            sx={{
              fontSize: theme => theme.typography.body2.fontSize,
              fontWeight: theme => theme.typography.fontWeightRegular,
            }}
          >
            {labelJA}
          </Typography>
        </Stack>
      ) : label}
      {...props}
      sx={{
        textTransform: 'initial',
        borderRadius: theme => `${theme.shape.borderRadius}px`,
        ...(isHighlighted ? {
          backgroundColor: theme => alpha(theme.palette.mPurple.main, 0.2),
        } : {
          backgroundColor: 'unset',
          transition: theme => `background-color ${theme.transitions.duration.shorter}ms ${theme.transitions.easing.easeInOut}`,
        }),
        ...props.sx,
      }}
    />
  )
}
