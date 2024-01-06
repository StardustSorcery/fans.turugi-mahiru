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
  CircularProgress,
  Divider,
  MenuItem,
  MenuList,
  Popover,
  Stack,
  StackProps,
  Typography,
} from "@mui/material";
import {
  useContext,
  useEffect,
  useState,
} from "react";

export default function AccountMenu({
  SignInButtonProps,
  AccountButtonProps,
  ...props
}: StackProps<
  'div',
  {
    SignInButtonProps?: ButtonProps;
    AccountButtonProps?: ButtonBaseProps;
  }
>): React.ReactNode {
  const {
    firebase: {
      user,
      status,
    }
  } = useContext(appContext);

  const {
    signInPopup,
  } = useContext(DefaultContext);

  const [ menuTarget, setMenuTarget ] = useState<HTMLElement | null>(null);
  useEffect(() => {
    if(status !== 'authenticated' || user === null) {
      setMenuTarget(null);
    }
  }, [
    user,
    status,
  ]);

  return (
    <>
      <Stack
        flexDirection="row"
        alignItems="center"
        {...props}
      >
        {status === 'loading' && (
          <CircularProgress
            color="secondary"
            size={40}
          />
        )}

        {(status === 'unauthenticated' && user === null) && (
          <Button
            variant="contained"
            color="secondary"
            {...SignInButtonProps}
            onClick={() => {
              signInPopup.open();
            }}
          >
            ログイン
          </Button>
        )}

        {(status === 'authenticated' && user !== null) && (
          <ButtonBase
            {...AccountButtonProps}
            sx={{
              borderRadius: '100%',
              ...AccountButtonProps?.sx,
            }}
            onClick={e => {
              setMenuTarget(e.currentTarget);
            }}
          >
            <Avatar
              src={user.photoURL || ''}
            />
          </ButtonBase>
        )}
      </Stack>

      {(status === 'authenticated' && user !== null) && (
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
      )}
    </>
  )
}
