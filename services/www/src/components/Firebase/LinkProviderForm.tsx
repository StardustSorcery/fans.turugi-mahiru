'use client';
import {
  Button,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  ListProps,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { appContext } from "../AppRegistry/AppContext";
import { linkGoogle, linkTwitter, unlinkGoogle, unlinkTwitter } from "@/utils/firebase/auth";
import { GoogleAuthProvider, TwitterAuthProvider, UserInfo } from "firebase/auth";

export default function LinkProvierForm({
  onCompleteUnlink = () => {},
  onFail = () => {},
  ...props
}: ListProps<
  any,
  {
    onCompleteUnlink?: () => any;
    onFail?: (err: any) => any;
  }
>): React.ReactNode {
  const {
    firebase: {
      user,
      userHash,
      reloadUser,
    },
  } = useContext(appContext);

  const [ isProcessing, setIsProcessing ] = useState<boolean>(false);

  const [ googleProfile, setGoogleProfile ] = useState<UserInfo | null>(null);
  const [ twitterProfile, setTwitterProfile ] = useState<UserInfo | null>(null);
  useEffect(() => {
    if(user === null) {
      setGoogleProfile(null);
      setTwitterProfile(null);
      return;
    }

    setGoogleProfile(user.providerData.find(p => p.providerId === (new GoogleAuthProvider().providerId)) || null);
    setTwitterProfile(user.providerData.find(p => p.providerId === (new TwitterAuthProvider()).providerId) || null);
  }, [
    user,
    userHash,
  ]);

  const [ hasOnlyOneMethod, setHasOnlyOneMethod ] = useState<boolean>(false);
  useEffect(() => {
    const profiles = [
      googleProfile,
      twitterProfile,
    ];

    setHasOnlyOneMethod(
      profiles.filter(e => !!e).length === 1
    );
  }, [
    googleProfile,
    twitterProfile,
  ]);

  return (
    <List
      {...props}
    >
      {user && userHash && (
        <>
          <ListItem
          >
            <ListItemText
              primary="Google"
              secondary={
                googleProfile
                  ? googleProfile.email
                  : undefined
              }
            />
            <ListItemSecondaryAction
            >
              {googleProfile ? (
                <Button
                  variant="outlined"
                  color="secondary"
                  size="small"
                  onClick={() => {
                    setIsProcessing(true);
                    unlinkGoogle()
                      .then(() => {
                        reloadUser();
                        onCompleteUnlink();
                      })
                      .catch(err => {
                        onFail(err);
                      })
                      .finally(() => {
                        setIsProcessing(false);
                      });
                  }}
                  disabled={isProcessing || hasOnlyOneMethod}
                >
                  連携解除
                </Button>
              ) : (
                <Button
                  variant="contained"
                  disableElevation
                  color="secondary"
                  size="small"
                  onClick={() => {
                    setIsProcessing(true);
                    linkGoogle()
                      .catch(err => {
                        setIsProcessing(false);
                        onFail(err);
                      });
                  }}
                  disabled={isProcessing}
                >
                  連携
                </Button>
              )}
            </ListItemSecondaryAction>
          </ListItem>

          <ListItem
          >
            <ListItemText
              primary="X (旧 Twitter)"
              secondary={
                twitterProfile
                  ? twitterProfile.displayName
                  : undefined
              }
            />
            <ListItemSecondaryAction
            >
              {twitterProfile ? (
                <Button
                  variant="outlined"
                  color="secondary"
                  size="small"
                  onClick={() => {
                    setIsProcessing(true);
                    unlinkTwitter()
                      .then(() => {
                        reloadUser();
                        onCompleteUnlink();
                      })
                      .catch(err => {
                        onFail(err);
                      })
                      .finally(() => {
                        setIsProcessing(false);
                      });
                  }}
                  disabled={isProcessing || hasOnlyOneMethod}
                >
                  連携解除
                </Button>
              ) : (
                <Button
                  variant="contained"
                  disableElevation
                  color="secondary"
                  size="small"
                  onClick={() => {
                    setIsProcessing(true);
                    linkTwitter()
                      .catch(err => {
                        setIsProcessing(false);
                        onFail(err);
                      });
                  }}
                  disabled={isProcessing}
                >
                  連携
                </Button>
              )}
            </ListItemSecondaryAction>
          </ListItem>

        </>
      )}
    </List>
  )
}
