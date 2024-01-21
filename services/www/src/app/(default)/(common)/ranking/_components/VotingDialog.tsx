'use client';
import { Close, InfoOutlined } from "@mui/icons-material";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import VideoInputField from "./VideoInputField";
import { Fragment, useCallback, useState } from "react";
import { StrapiResponseData, Video } from "@/types/strapi";
import { VideoItem } from "./VideoItem";

export default function VotingDialog({
  onClose,
  ...props
}: DialogProps & {
  onClose: () => any;
}) {
  const [ voting, setVoting ] = useState<StrapiResponseData<Video>[]>([]);

  const addVideo = useCallback((video: StrapiResponseData<Video>) => {
    if(voting.length === 5) {
      throw new Error('queue-is-full');
    }
    if(voting.find(v => v.id === video.id)) {
      throw new Error('duplicated-video-id');
    }

    setVoting(prev => ([
      ...prev,
      video,
    ]));
  }, [
    voting,
  ]);

  const swapVideos = useCallback((index1: number, index2: number) => {
    const _voting = [ ...voting ];

    const video1 = _voting[index1];
    const video2 = _voting[index2];

    if(!video1 || !video2) {
      throw new Error('no-target');
    }

    _voting[index1] = video2;
    _voting[index2] = video1;

    setVoting(_voting);
  }, [
    voting,
  ]);

  const removeVideo = useCallback((index: number) => {
    const _voting = [ ...voting ];
    _voting.splice(index, 1);

    setVoting(_voting);
  }, [
    voting,
  ]);

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
        {voting.length === 0 ? (
          <Stack
            p={4}
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
          >
            <InfoOutlined
              sx={{
                mr: 1,
              }}
            />
            <Typography
            >
              URL を入力して動画・配信をリストに追加してください.
            </Typography>
          </Stack>
        ) : (
          voting.map((video, index) => (
            <Fragment
              key={video.id}
            >
              <VideoItem
                rank={index + 1}
                score={5 - index}
                video={video}
                toUpperButtonDisabled={index === 0}
                onToUpperButtonClick={() => {
                  swapVideos(index, index - 1);
                }}
                toLowerButtonDisabled={index === voting.length - 1}
                onToLowerButtonClick={() => {
                  swapVideos(index, index + 1);
                }}
                onDeleteButtonClick={() => {
                  removeVideo(index);
                }}
              />
            </Fragment>
          ))
        )}
      </DialogContent>

      <DialogActions
      >
        <VideoInputField
          onSuccess={addVideo}
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
