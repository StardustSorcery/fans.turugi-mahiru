'use client';
import SignInForm from "@/components/Firebase/SignInForm";
import { Button, Dialog, DialogActions, DialogContent, DialogProps, DialogTitle } from "@mui/material";
import { useContext } from "react";
import DefaultContext from "../DefaultContext";
import { useSnackbar } from "notistack";

export default function SignInPopup({
  ...props
}: Omit<DialogProps, 'open'>): React.ReactNode {
  const {
    signInPopup: {
      isOpen,
      close,
    },
  } = useContext(DefaultContext);

  const { enqueueSnackbar } = useSnackbar();

  return (
    <Dialog
      maxWidth="xs"
      fullWidth
      open={isOpen}
      onClose={() => {
        close();
      }}
      {...props}
    >
      <DialogTitle
      >
        ログイン
      </DialogTitle>

      <DialogContent
      >
        <SignInForm
          onError={() => {
            enqueueSnackbar('ログイン中にエラーが発生しました', { variant: 'error' });
          }}
        />
      </DialogContent>

      <DialogActions
      >
        <Button
          color="secondary"
          onClick={() => {
            close();
          }}
        >
          キャンセル
        </Button>
      </DialogActions>
    </Dialog>
  )
}
