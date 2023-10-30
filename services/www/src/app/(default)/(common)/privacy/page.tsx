import {
  Box,
  Container,
  Paper,
  Typography,
} from "@mui/material";
import Heading1 from "@/components/Heading/Heading1";
import { StrapiResponse } from "strapi-sdk-js";
import { Privacy, StrapiResponseData } from "@/types/strapi";
import date2str from "@/utils/date2str";
import MD2Material from "@/components/MD2Material/MD2Material";

export const metadata = {
  title: 'プライバシーポリシー | 剣城まひる.fans - 非公式ファンサイト',
  description: '個人VTuber『剣城 (つるぎ) まひる』さんの非公式ファンサイト',
};

function fetchPrivacy(): Promise<{
  data: StrapiResponse<StrapiResponseData<Privacy>> | null;
  error: Error | null;
}> {
  const url = `http://localhost:${process.env.PORT || '80'}/api/privacy`;

  return fetch(url, { cache: 'no-cache' })
    .then(resp => (resp.json() as unknown) as StrapiResponse<StrapiResponseData<Privacy>>)
    .then(data => ({
      data,
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

export default async function PrivacyPage() {
  const {
    data: privacy,
    error: privacyError,
  } = await fetchPrivacy();

  return (
    <>
      <Box
        component="main"
        my={4}
      >
        <Container
          maxWidth="lg"
        >
          <Box
            component={Paper}
            elevation={6}
          >
            <Heading1
              text="プライバシーポリシー"
            />

            {privacyError || !privacy ? (
              <Typography
                align="center"
                component="p"
                variant="subtitle1"
              >
                読み込みに失敗しました.
              </Typography>
            ) : (
              <Box
                px={2}
                py={3}
              >
                <MD2Material
                  markdown={privacy.data.attributes.body}
                />

                <Typography
                  align="right"
                >
                  以上
                </Typography>
                <Typography
                  component="p"
                  variant="subtitle2"
                  mt={4}
                >
                  {date2str(new Date(privacy.data.attributes.updatedAt))} 最終更新・発効
                </Typography>
              </Box>
            )}
          </Box>
        </Container>
      </Box>
    </>
  );
}
