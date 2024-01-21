'use client';
import { Close, InfoOutlined } from "@mui/icons-material";
import {
  Box,
  CircularProgress,
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
import { Fragment, useCallback, useContext, useEffect, useState } from "react";
import { RankingUserVoting, StrapiResponseData, Video } from "@/types/strapi";
import { VideoItem } from "./VideoItem";
import axios, { AxiosError } from "axios";
import { appContext } from "@/components/AppRegistry/AppContext";
import { SaveStatus } from "./SaveStatus";

export default function VotingDialog({
  open,
  onClose,
  ...props
}: DialogProps & {
  onClose: () => any;
}) {
  const {
    firebase: {
      user,
      userHash,
      status,
    },
  } = useContext(appContext);

  const [ voting, setVoting ] = useState<StrapiResponseData<Video>[]>([]);

  const [ loadStatus, setLoadStatus ] = useState<'loading' | 'loaded' | 'failed'>('loading');
  const loadVoting = useCallback(async () => {
    if(!user) return;

    setLoadStatus('loading')
    const idToken = await user
      .getIdToken()
      .catch(err => {
        return null;
      });
    if(!idToken) {
      setLoadStatus('failed');
      return;
    }

    const videos = await axios
      .request<StrapiResponseData<RankingUserVoting>>({
        method: 'get',
        url: '/api/ranking/votings',
        headers: {
          'Authorization': `Bearer ${idToken}`,
        },
      })
      .then(res => {
        return res.data.attributes.videos.data;
      })
      .catch((err: AxiosError) => {
        if(err.response?.status === 404) return [] as StrapiResponseData<Video>[];
        return null;
      });
    if(!videos) {
      setLoadStatus('failed');
      return;
    }

    setVoting(videos);
    setLoadStatus('loaded');
  }, [
    user,
    userHash,
  ]);
  useEffect(() => {
    if(!open) return;
    loadVoting();
  }, [
    loadVoting,
    open,
  ]);

  const [ saveStatus, setSaveStatus ] = useState<'none' | 'saved' | 'saving' | 'failed'>('none');
  useEffect(() => {
    if(!open) return;
    setSaveStatus('none');
  }, [
    open,
  ]);

  const saveVoting = useCallback(async (voting: StrapiResponseData<Video>[]) => {
    if(!user) return;

    setSaveStatus('saving');
    const idToken = await user.getIdToken()
      .catch(err => {
        setSaveStatus('failed');
        return null;
      });
    if(!idToken) return;

    const updatedRecord = await axios
      .request<StrapiResponseData<RankingUserVoting>>({
        method: 'PUT',
        url: '/api/ranking/votings',
        headers: {
          'Authorization': `Bearer ${idToken}`,
        },
        data: {
          videos: voting
            .map(v => v.id),
        },
      })
      .then(res => {
        return res.data;
      })
      .catch(err => {
        setSaveStatus('failed');
        return null;
      });
    if(!updatedRecord) return;

    setSaveStatus('saved');
  }, [
    user,
    userHash,
  ]);

  const addVideo = useCallback((video: StrapiResponseData<Video>) => {
    if(voting.length === 5) {
      throw new Error('queue-is-full');
    }
    if(voting.find(v => v.id === video.id)) {
      throw new Error('duplicated-video-id');
    }

    const _voting = [
      ...voting,
      video,
    ];

    setVoting(_voting);
    saveVoting(_voting);
  }, [
    voting,
    saveVoting,
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
    saveVoting(_voting);
  }, [
    voting,
  ]);

  const removeVideo = useCallback((index: number) => {
    const _voting = [ ...voting ];
    _voting.splice(index, 1);

    setVoting(_voting);
    saveVoting(_voting);
  }, [
    voting,
  ]);

  return (
    <Dialog
      open={open}
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

        <Box
          flexGrow={1}
        />

        <SaveStatus
          status={saveStatus}
        />
      </DialogTitle>

      <DialogContent
        dividers
      >
        {{
          loading: (
            <Stack
              alignItems="center"
              my={4}
            >
              <CircularProgress
                color="secondary"
              />
            </Stack>
          ),
          failed: (
            <Stack
              alignItems="center"
              my={4}
            >
              <Typography
              >
                データの読み込み中にエラーが発生しました。
              </Typography>
            </Stack>
          ),
          loaded: (
            voting.length === 0 ? (
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
            )
          ),
        }[loadStatus]}
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
