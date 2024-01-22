import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import NextLink from "next/link";
import NotFound from "./_components/NotFound";

export const metadata = {
  title: 'ページが見つかりませんでした | 剣城まひる.fans - 非公式ファンサイト',
  description: 'VTuber『剣城 (つるぎ) まひる』さんの非公式ファンサイト',
};

export default function NewsItemNotFound() {
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
            <NotFound
            />
          </Box>
        </Container>
      </Box>
    </>
  );
}
