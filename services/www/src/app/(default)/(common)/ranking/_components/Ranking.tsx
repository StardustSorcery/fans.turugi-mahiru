'use client';
import {
  Button,
  Stack,
  StackProps,
} from "@mui/material";
import { useCallback, useState } from "react";
import VotingDialog from "./VotingDialog";

export default function Ranking({
  ...props
}: StackProps<
  any,
  {}
>) {
  const [ votingDialogIsOpen, setVotingDialogIsOpen ] = useState<boolean>(false);
  const openVotingDialog = useCallback(() => setVotingDialogIsOpen(true), []);
  const closeVotingDialog = useCallback(() => setVotingDialogIsOpen(false), []);

  return (
    <>
      <Stack
      >
        <Button
          variant="contained"
          disableElevation
          color="secondary"
          onClick={openVotingDialog}
        >
          投票する
        </Button>

      </Stack>

      <VotingDialog
        open={votingDialogIsOpen}
        onClose={closeVotingDialog}
      />
    </>
  )
}
