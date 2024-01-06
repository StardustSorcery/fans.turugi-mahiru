import QandA from "@/components/QandA";
import { Box, Container, Link, Paper, Stack, Typography } from "@mui/material";
import AbstractSection from "./_components/AbstractSection";
import TitleSection from "./_components/TitleSection";
import { DiscordInvitation } from "@/types/strapi";
import { notoColorEmoji } from "@/app/fonts";

export const metadata = {
  title: 'Discord サーバー『剣城まひるの救急箱🩹』 | 剣城まひる.fans - 非公式ファンサイト',
  description: 'VTuber『剣城 (つるぎ) まひる』さんの非公式ファンサイト',
};

async function fetchDiscordInvitation(): Promise<{
  data: {
    invitationIsActive: boolean;
    invitationURL: string;
  } | null;
  error: Error | null;
}> {
  const url = `http://localhost:${process.env.PORT || '80'}/api/discord/invitation`;

  return await fetch(url, { cache: 'no-cache' })
    .then(resp => (resp.json() as unknown) as DiscordInvitation)
    .then(resp => ({
      data: {
        invitationIsActive: resp.isActive,
        invitationURL: resp.url || '',
      },
      error: null,
    }))
    .catch((err: Error) => {
      console.error(err);
      return {
        data: null,
        error: err,
      };
    });
}

export default async function DiscordPage() {
  const {
    data,
    error,
  } = await fetchDiscordInvitation();

  return (
    <>
      <Stack
        component="main"
        mb={4}
      >
        <TitleSection
          isError={!!error}
          isActive={data ? data.invitationIsActive : false}
          url={data ? data.invitationURL : ''}
        />

        <AbstractSection
        />

        <Container
          maxWidth="md"
          sx={{
            mt: 4
          }}
        >
          <Box
            component={Paper}
            variant="outlined"
          >
            <Stack
              p={4}
              gap={2}
            >
              <QandA
                question="Discord サーバーに参加するために費用はかかりますか？"
                answer="無料でご参加いただけます"
                answerDetail={
                  <>
                    <Typography
                      paragraph
                    >
                      できるだけ多くの方に自由にご参加いただけるようにするため、参加費用等は頂いておりません。
                    </Typography>
                    <Typography
                      paragraph
                    >
                      サーバー内のすべてのコンテンツに無料でアクセスできます。
                    </Typography>
                  </>
                }
              />

              <QandA
                question="参加するために必要な条件などはありますか？"
                answer="剣城まひるさんのファンなら誰でも歓迎です！"
                answerDetail={
                  <>
                    <Typography
                      paragraph
                    >
                      他の VTuber さんを中心に推している方でも、剣城まひるさんを応援している方なら誰でも歓迎いたします。
                    </Typography>
                    <Typography
                      paragraph
                    >
                      なおサーバー参加後に自己紹介チャンネルにて自己紹介の投稿を必須とさせていただいております。自己紹介を確認後にすべてのチャンネルを閲覧できるよう権限を変更いたします。
                    </Typography>
                  </>
                }
              />

              <QandA
                question="FANBOX 特典の公式 Discord サーバーとの違いは何ですか？"
                answer="運営母体とサーバー内のコンテンツが大きく異なります。"
                answerDetail={
                  <>
                    <Typography
                      paragraph
                    >
                      FANBOX 特典の Discord サーバーは剣城まひるさんが運営する公式 Discord サーバーですが、「剣城まひるの救急箱
                      <Box
                        component="span"
                        sx={{
                          fontFamily: notoColorEmoji.style.fontFamily,
                        }}
                      >
                        🩹
                      </Box>
                      」は Stardust Sorcery が運営する非公式の Discord ファンサーバーです。
                    </Typography>
                    <Typography
                      paragraph
                    >
                      サーバーメンバー同士で雑談ができるチャンネルはどちらのサーバーにも存在しますが、公式サーバーでは不定期に剣城まひるさんと会話することも可能です。一方で非公式サーバーでは他にもサプライズ企画やコミックマーケットをはじめとした同人誌即売会への参加などをファン同士で企画できるチャンネルがあり、ファン同士の交流や創作活動などに重点を置いています。
                    </Typography>
                    <Typography
                      paragraph
                    >
                      FANBOX 特典の公式 Discord サーバーの詳細は&nbsp;
                      <Link
                        href="https://www.fanbox.cc/@turugimahiru/plans"
                        target="_blank"
                        color="secondary"
                      >
                        FANBOX のプラン一覧
                      </Link>
                      &nbsp;などの公式情報をご確認ください。
                    </Typography>
                  </>
                }
              />
            </Stack>
          </Box>
        </Container>
      </Stack>
    </>
  );
}
