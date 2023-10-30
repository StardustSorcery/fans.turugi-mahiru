import {
  ListItem,
  ListItemButton,
  ListItemProps,
  ListItemText,
} from "@mui/material";
import {
  alpha,
} from '@mui/material/styles';
import NextLink, {
  type LinkProps as NextLinkProps,
} from "next/link";

export default function SideNavigationItem({
  label,
  labelEN,
  labelJA,
  href,
  selected = false,
  ...props
}: ListItemProps<
  any,
  {
    label?: string;
    labelEN?: string;
    labelJA?: string;
    href: string;
    selected?: boolean;
  }
>): React.ReactNode {
  return (
    <ListItem
      disablePadding
      {...props}
      sx={{
        borderRadius: theme => `${theme.shape.borderRadius}px`,
        ...props.sx,
      }}
    >
      <ListItemButton
        LinkComponent={NextLink}
        href={href}
        selected={selected}
        sx={{
          '&.Mui-selected': {
            backgroundColor: theme => alpha(theme.palette.mPurple.main, 0.2),
          },
        }}
      >
        <ListItemText
          primary={(labelEN && labelJA) ? labelEN : label}
          secondary={(labelEN && labelJA) && labelJA}
        />
      </ListItemButton>
    </ListItem>
  );
}
