'use client';
import { Close } from "@mui/icons-material";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  IconButton,
} from "@mui/material";
import VideoInputField from "./VideoInputField";

export default function VotingDialog({
  onClose,
  ...props
}: DialogProps & {
  onClose: () => any;
}) {
  return (
    <Dialog
      scroll="paper"
      maxWidth="sm"
      fullWidth
      {...props}
    >
      <DialogTitle
        display="flex"
        flexDirection="row"
        alignItems="center"
      >
        <IconButton
          edge="start"
          onClick={() => {
            onClose();
          }}
          sx={{
            mr: 2,
          }}
        >
          <Close
          />
        </IconButton>
        投票
      </DialogTitle>

      <DialogContent
        dividers
      >
      </DialogContent>

      <DialogActions
      >
        <VideoInputField
          onSuccess={console.log}
          onError={console.error}
          disabled={false}
          sx={{
            width: '100%',
          }}
        />
      </DialogActions>
    </Dialog>
  );
}
