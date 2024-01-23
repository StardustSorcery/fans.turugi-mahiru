import {
  Box,
  Container,
  Paper,
  Typography,
} from "@mui/material";
import Heading1 from "@/components/Heading/Heading1";
import date2str from "@/utils/date2str";
import MD2Material from "@/components/MD2Material/MD2Material";
import getTerms from "@/app/_libs/strapi/terms/getTerms";
import { Metadata } from "next";
import deepmerge from "deepmerge";
import defaultMetadata from "@/constants/defaultMetadata";

export const metadata = deepmerge<Metadata>(
  defaultMetadata,
  {
    title: '利用規約 | 剣城まひる.fans - 非公式ファンサイト',
    openGraph: {
      title: '利用規約 | 剣城まひる.fans - 非公式ファンサイト',
    },
    twitter: {
      title: '利用規約 | 剣城まひる.fans - 非公式ファンサイト',
    },
  }
);

export default async function TermsPage() {
  const {
    data: terms,
    error: termsError,
  } = await getTerms();

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
                  markdown={terms.attributes.body}
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
                  {date2str(new Date(terms.attributes.updatedAt))} 最終更新・発効
                </Typography>
              </Box>
            )}
          </Box>
        </Container>
      </Box>
    </>
  );
}
