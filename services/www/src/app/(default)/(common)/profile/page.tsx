import {
  Box,
  Container,
  Paper,
} from "@mui/material";
import Profile from "./_components/Profile";
import { Metadata } from "next";
import deepmerge from "deepmerge";
import defaultMetadata from "@/constants/defaultMetadata";

export const metadata = deepmerge<Metadata>(
  defaultMetadata,
  {
    title: 'プロフィール | 剣城まひる.fans - 非公式ファンサイト',
    openGraph: {
      title: 'プロフィール | 剣城まひる.fans - 非公式ファンサイト',
    },
    twitter: {
      title: 'プロフィール | 剣城まひる.fans - 非公式ファンサイト',
    },
  }
);

export default function ProfilePage() {
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
            <Box
              px={2}
              py={3}
            >
              <Profile
              />
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
}
