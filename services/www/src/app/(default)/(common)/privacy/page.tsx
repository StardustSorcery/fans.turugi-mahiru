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
import getPrivacy from "@/app/_libs/strapi/privacy/getPrivacy";
import { Metadata } from "next";
import deepmerge from "deepmerge";
import defaultMetadata from "@/constants/defaultMetadata";

export const metadata = deepmerge<Metadata>(
  defaultMetadata,
  {
    title: 'プライバシーポリシー | 剣城まひる.fans - 非公式ファンサイト',
    openGraph: {
      title: 'プライバシーポリシー | 剣城まひる.fans - 非公式ファンサイト',
    },
    twitter: {
      title: 'プライバシーポリシー | 剣城まひる.fans - 非公式ファンサイト',
    },
  }
);

export default async function PrivacyPage() {
  const {
    data: privacy,
    error: privacyError,
  } = await getPrivacy();

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
                  markdown={privacy.attributes.body}
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
                  {date2str(new Date(privacy.attributes.updatedAt))} 最終更新・発効
                </Typography>
              </Box>
            )}
          </Box>
        </Container>
      </Box>
    </>
  );
}
