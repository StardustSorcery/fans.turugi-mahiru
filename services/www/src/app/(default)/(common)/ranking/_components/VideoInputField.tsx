'use client';
import {
  useCallback,
  useState,
} from 'react';
import {
  Stack,
  TextField,
  Button,
  TextFieldProps,
  StackProps,
  ButtonProps,
  CircularProgress,
} from '@mui/material';
import axios from 'axios';
import { NavigationEndpoint } from 'youtubei.js/dist/src/parser/nodes';
import { StrapiResponseData, Video } from '@/types/strapi';

export default function VideoInputField({
  onSuccess = () => {},
  onError = () => {},
  disabled = false,
  ...props
}: StackProps<
  any,
  {
    onSuccess: (video: StrapiResponseData<Video>) => any;
    onError: (err: Error) => any;
    disabled: boolean;
  }
>) {
  const [ isBusy, setIsBusy ] = useState<boolean>(false);

  const [ urlValue, setURLValue ] = useState<string>('');
  const handleURLValueChange = useCallback<Exclude<TextFieldProps['onChange'], undefined>>((e) => setURLValue(e.currentTarget.value), []);

  const getVideoInfo = useCallback(async () => {
    const url = new URL(urlValue);

    if(/^(.+\.)?(youtube.com)|(youtu.be)$/.test(url.host)) { // YouTube
      const videoId = await axios
        .request<NavigationEndpoint>({
          url: '/api/youtube/resolve-url',
          method: 'get',
          params: {
            url: url.toString(),
          },
        })
        .then(resp => {
          return resp.data.payload?.videoId || null;
        })
        .catch(err => {
          return null;
        });
      if(!videoId) throw new Error('resolve-url-failed');

      const videoRecord = await axios
        .request<StrapiResponseData<Video>>({
          url: '/api/videos',
          method: 'get',
          params: {
            provider: 'youtube',
            videoId,
          },
        })
        .then(resp => {
          return resp.data || null;
        })
        .catch(err => {
          return null;
        });
      if(!videoRecord) throw new Error('get-video-info-failed');

      return videoRecord;
    }
    else {
      throw new Error('provider-not-implemented');
    }
  }, [
    urlValue,
  ]);

  const handleSubmitClick = useCallback<Exclude<ButtonProps['onClick'], undefined>>(async () => {
    setIsBusy(true);

    await getVideoInfo()
      .then(info => {
        onSuccess(info);
        setURLValue('');
      })
      .catch(err => {
        onError(err);
      })
      .finally(() => {
        setIsBusy(false);
      });
  }, [
    getVideoInfo,
    onSuccess,
    onError,
  ]);

  return (
    <Stack
      flexDirection="row"
      alignItems="stretch"
      gap={1}
      {...props}
    >
      <TextField
        variant="outlined"
        size="small"
        color="secondary"
        placeholder="動画・配信の URL"
        fullWidth
        autoComplete="off"
        value={urlValue}
        onChange={handleURLValueChange}
        disabled={disabled || isBusy}
      />

      <Button
        variant="contained"
        disableElevation
        color="secondary"
        onClick={handleSubmitClick}
        disabled={disabled || isBusy || urlValue.trim() === ''}
      >
        {isBusy ? (
          <CircularProgress
            color="secondary"
            size={18}
          />
        ) : (
          <>
            追加
          </>
        )}
      </Button>
    </Stack>
  );
}
