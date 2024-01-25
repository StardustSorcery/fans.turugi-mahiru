import QandA from "@/components/QandA";
import { Box, Container, Link, Paper, Stack, Typography } from "@mui/material";
import AbstractSection from "./_components/AbstractSection";
import TitleSection from "./_components/TitleSection";
import { DiscordInvitation } from "@/types/strapi";
import { notoColorEmoji } from "@/app/fonts";
import getDiscordInvitation from "@/app/_libs/strapi/discord/getDiscordInvitation";
import { Metadata } from "next";
import deepmerge from "deepmerge";
import defaultMetadata from "@/constants/defaultMetadata";

export const dynamic = 'force-dynamic';

export const metadata = deepmerge<Metadata>(
  defaultMetadata,
  {
    title: 'Discord サーバー『剣城まひるの救急箱🩹』 | 剣城まひる.fans - 非公式ファンサイト',
    openGraph: {
      title: 'Discord サーバー『剣城まひるの救急箱🩹』 | 剣城まひる.fans - 非公式ファンサイト',
      images: [
        {
          url: 'https://turugi-mahiru.fans/og-discord.png',
          width: 1528,
          height: 800,
        },
      ],
    },
    twitter: {
      title: 'Discord サーバー『剣城まひるの救急箱🩹』 | 剣城まひる.fans - 非公式ファンサイト',
      images: [ 'https://turugi-mahiru.fans/og-discord.png' ],
    },
  },
  {
    arrayMerge: (x, y) => y,
  }
);

export default async function DiscordPage() {
  const {
    data: invitation,
    error,
  } = await getDiscordInvitation();

  return (
    <>
      <Stack
        component="main"
        mb={4}
      >
        <TitleSection
          isError={!!error}
          isActive={invitation?.isActive || false}
          url={invitation?.url || '#'}
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
