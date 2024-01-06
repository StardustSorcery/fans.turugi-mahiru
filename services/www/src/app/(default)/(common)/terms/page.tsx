import {
  Box,
  Container,
  Paper,
  Typography,
} from "@mui/material";
import Heading1 from "@/components/Heading/Heading1";
import { StrapiResponse } from "strapi-sdk-js";
import { StrapiResponseData, Terms } from "@/types/strapi";
import date2str from "@/utils/date2str";
import MD2Material from "@/components/MD2Material/MD2Material";

export const metadata = {
  title: '利用規約 | 剣城まひる.fans - 非公式ファンサイト',
  description: 'VTuber『剣城 (つるぎ) まひる』さんの非公式ファンサイト',
};

function fetchTerms(): Promise<{
  data: StrapiResponse<StrapiResponseData<Terms>> | null;
  error: Error | null;
}> {
  const url = `http://localhost:${process.env.PORT || '80'}/api/terms`;

  return fetch(url, { cache: 'no-cache' })
    .then(resp => (resp.json() as unknown) as StrapiResponse<StrapiResponseData<Terms>>)
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

export default async function TermsPage() {
  const {
    data: terms,
    error: termsError,
  } = await fetchTerms();

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
              text="利用規約"
            />

            {termsError || !terms ? (
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
                  markdown={terms.data.attributes.body}
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
                  {date2str(new Date(terms.data.attributes.updatedAt))} 最終更新・発効
                </Typography>
              </Box>
            )}
          </Box>
        </Container>
      </Box>
    </>
  );
}
