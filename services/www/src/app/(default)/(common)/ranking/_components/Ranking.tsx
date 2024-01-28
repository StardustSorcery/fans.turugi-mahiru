'use client';
import {
  Button,
  Stack,
  StackProps,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useCallback, useContext, useState } from "react";
import VotingDialog from "./VotingDialog";
import { Ranking, StrapiResponseData } from "@/types/strapi";
import { VideoCard } from "./VideoCard";
import { appContext } from "@/components/AppRegistry/AppContext";
import DefaultContext from "@/app/(default)/_components/DefaultContext";
import { Hint } from "@/components/Hint";

export default function RankingMain({
  ranking,
  ...props
}: StackProps<
  any,
  {
    ranking: StrapiResponseData<Ranking>;
  }
>) {
  const {
    firebase: {
      status,
    }
  } = useContext(appContext);
  const {
    signInPopup,
  } = useContext(DefaultContext);

  const [ votingDialogIsOpen, setVotingDialogIsOpen ] = useState<boolean>(false);
  const openVotingDialog = useCallback(() => setVotingDialogIsOpen(true), []);
  const closeVotingDialog = useCallback(() => setVotingDialogIsOpen(false), []);

  const isMobile = useMediaQuery('(max-width:809px)');

  return (
    <>
      <Stack
        {...props}
      >
        <Stack
          flexDirection="row"
          justifyContent="flex-end"
          gap={1}
        >
          <Button
            variant={status === 'authenticated' ? 'contained' : 'outlined'}
            disableElevation
            color="secondary"
            onClick={
              status === 'unauthenticated'
                ? signInPopup.open
                : openVotingDialog
            }
            disabled={status === 'loading'}
          >
            {{
              'loading': '投票する',
              'unauthenticated': 'ログインして投票する',
              'authenticated': '投票する',
            }[status]}
          </Button>

          <Hint
            hint={
              <>
                <Typography
                >
                  ログインすることで、おすすめ動画・配信を投票できます。
                </Typography>
                <Typography
                >
                  集計は毎日 2:00 (JST) に行われ、上位 100 件が表示されます。
                </Typography>
                <Typography
                  color="textSecondary"
                >
                  ※ 集計結果には投票を行ったユーザの名前は公開されません。
                </Typography>
              </>
            }
          />
        </Stack>

        <Stack
          display="flex"
          flexDirection="row"
          flexWrap="wrap"
          justifyContent="center"
          rowGap={4}
          columnGap={2}
          my={3}
        >
          {ranking.attributes.scoredVideos.map(scoredVideo => (
            <VideoCard
              key={scoredVideo.id}
              video={scoredVideo.video.data}
              score={scoredVideo.score}
              variant="outlined"
              sx={{
                flexShrink: 0,
                width: '100%',
                maxWidth: theme => theme.spacing(38),
              }}
            />
          ))}
        </Stack>
      </Stack>

      <VotingDialog
        fullScreen={isMobile}
        open={votingDialogIsOpen}
        onClose={closeVotingDialog}
      />
    </>
  )
}
