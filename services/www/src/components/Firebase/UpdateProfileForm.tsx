'use client'
import {
  Avatar,
  Box,
  Button,
  ButtonBase,
  InputLabel,
  Stack,
  StackProps,
  TextField,
} from "@mui/material";
import { alpha } from '@mui/material/styles';
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { appContext } from "../AppRegistry/AppContext";
import { EditOutlined } from "@mui/icons-material";
import { updateDisplayName, updatePhoto } from "@/utils/firebase/auth";

export function UpdateProfileForm({
  ...props
}: StackProps): React.ReactNode {
  const {
    firebase: {
      user,
      userHash,
      reloadUser,
    },
  } = useContext(appContext);

  // Data store
  const [ photo, setPhoto ] = useState<File | null>(null);
  const [ photoURL, setPhotoURL ] = useState<string>('');
  const [ displayName, setDisplayName ] = useState<string>('');

  const reset = useCallback(() => {
    setPhoto(null);
    setPhotoURL(user?.photoURL || '');
    setDisplayName(user?.displayName || '');
  }, [
    user,
    userHash,
  ]);

  useEffect(() => {
    reset();

    return () => {
      reset();
    };
  }, [
    reset,
  ]);

  // Photo controls
  useEffect(() => {
    if(!photo) return;

    setPhotoURL(window.URL.createObjectURL(photo));
  }, [
    photo,
  ]);

  // Action controls
  const [ hasChanges, setHasChanges ] = useState<boolean>(false);
  useEffect(() => {
    setHasChanges(
      user?.photoURL !== photoURL
      || user?.displayName !== displayName
    );
  }, [
    user,
    userHash,
    photoURL,
    displayName,
  ]);

  // Actions
  const photoInputElRef = useRef<HTMLInputElement>(null);
  
  const handlePhotoInputChange: React.ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    if(!e.target.files || e.target.files.length === 0) {
      return;
    }

    const file = e.target.files[0];

    if(
      ![
        'image/png',
        'image/jpg',
        'image/jpeg',
        'image/webp',
      ].includes(file.type)
    ) {
      return;
    }

    setPhoto(file);
  }, []);

  const [ isProcessing, setIsProcessing ] = useState<boolean>(false);

  const save = useCallback(() => {
    const tasks: Promise<any>[] = [];

    if(user?.photoURL !== photoURL && !!photo) {
      tasks.push(
        updatePhoto(photo)
      );
    }
    
    if(user?.displayName !== displayName) {
      tasks.push(
        updateDisplayName(displayName)
      );
    }

    setIsProcessing(true);
    return Promise.all(tasks)
      .then(() => {
        reloadUser();
      })
      .finally(() => {
        setIsProcessing(false);
      });
  }, [
    user,
    userHash,
    photo,
    photoURL,
    displayName,
  ]);

  return (
    <Stack
      {...props}
    >
      {user && userHash && (
        <>
          <Stack
            gap={2}
          >
            <Stack
              alignItems="flex-start"
            >
              <InputLabel
                shrink
              >
                プロフィール画像
              </InputLabel>

              <Box
                sx={{
                  position: 'relative',
                }}
              >
                <Avatar
                  src={photoURL}
                  sx={{
                    width: theme => theme.spacing(8),
                    height: theme => theme.spacing(8),
                  }}
                />

                <ButtonBase
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '100%',
                    overflow: 'hidden',
                    backgroundColor: theme => alpha(theme.palette.common.black, .3),
                    color: theme => theme.palette.common.white,
                  }}
                  onClick={() => {
                    const photoInputEl = photoInputElRef.current;
                    if(!photoInputEl) return;
                    photoInputEl.click();
                  }}
                >
                  <EditOutlined
                  />
                </ButtonBase>

                <input
                  type="file"
                  accept="image/*,.png,.jpg,.jpeg,.webp"
                  hidden
                  ref={photoInputElRef}
                  onChange={handlePhotoInputChange}
                />
              </Box>
            </Stack>

            <TextField
              variant="standard"
              label="名前"
              color="secondary"
              fullWidth
              value={displayName}
              onChange={e => {
                setDisplayName(e.target.value);
              }}
            />
          </Stack>

          <Stack
            mt={4}
            flexDirection="row"
            alignItems="center"
            justifyContent="flex-end"
            gap={1}
          >
            <Button
              variant="text"
              color="secondary"
              onClick={() => {
                reset();
              }}
              disabled={isProcessing || !hasChanges}
            >
              キャンセル
            </Button>

            <Button
              variant="contained"
              disableElevation
              color="secondary"
              onClick={() => {
                save();
              }}
              disabled={isProcessing || !hasChanges}
            >
              保存
            </Button>
          </Stack>
        </>
      )}
    </Stack>
  )
}
