'use client';
import AccountMenu from "@/components/AccountMenu";

export default function FloatingAccountMenu() {
  return (
    <AccountMenu
      sx={{
        position: 'fixed',
        top: theme => theme.spacing(1),
        right: theme => theme.spacing(2),
        zIndex: theme => theme.zIndex.drawer - 1,
      }}
    />
  );
}