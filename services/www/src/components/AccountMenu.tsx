'use client';
import DefaultContext from "@/app/(default)/_components/DefaultContext";
import { appContext } from "@/components/AppRegistry/AppContext";
import { signOut } from "@/utils/firebase/auth";
import {
  Avatar,
  Button,
  ButtonBase,
  ButtonBaseProps,
  ButtonProps,
  Divider,
  MenuItem,
  MenuList,
  Popover,
  Stack,
  Typography,
} from "@mui/material";
import {
  useContext,
  useState,
} from "react";

export default function AccountMenu({
  ...props
}: ButtonProps & ButtonBaseProps): React.ReactNode {
  const {
    firebase: {
      user,
      status,
    }
  } = useContext(appContext);

  const {
    signInPopup,
  } = useContext(DefaultContext);

  if(status !== 'authenticated' || user === null) {
    return (
      <Button
        variant="contained"
        color="secondary"
        {...props}
        onClick={() => {
          signInPopup.open();
        }}
        disabled={status === 'loading'}
      >
        ログイン
      </Button>
    );
  }

  const [ menuTarget, setMenuTarget ] = useState<HTMLElement | null>(null);

  return (
    <>
      <ButtonBase
        {...props}
        sx={{
          borderRadius: '100%',
          ...props.sx,
        }}
        onClick={e => {
          setMenuTarget(e.currentTarget);
        }}
      >
        <Avatar
          src={user.photoURL || ''}
        />
      </ButtonBase>

      <Popover
        anchorEl={menuTarget}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={menuTarget !== null}
        onClose={() => {
          setMenuTarget(null);
        }}
      >
        <Stack
          flexDirection="row"
          alignItems="center"
          gap={1}
          p={2}
        >
          <Avatar
            src={user.photoURL || ''}
            sx={{
              width: theme => theme.spacing(5),
              height: theme => theme.spacing(5),
            }}
          />

          <Typography
            align="center"
          >
            {user.displayName}
          </Typography>
        </Stack>

        <Divider
        />

        <MenuList
        >
          <MenuItem
          >
            アカウント設定
          </MenuItem>

          <MenuItem
            onClick={() => {
              signOut();
            }}
          >
            ログアウト
          </MenuItem>
        </MenuList>
      </Popover>
    </>
  )
}
