import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import NextLink from "next/link";

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
            <Stack
              alignItems="center"
              gap={3}
              px={2}
              py={4}
            >
              <Typography
                component="p"
                variant="subtitle1"
                align="center"
              >
                お探しのニュースは見つかりませんでした.
              </Typography>

              <Button
                LinkComponent={NextLink}
                href="/news"
                variant="outlined"
                color="secondary"
              >
                ニュース 一覧
              </Button>
            </Stack>
          </Box>
        </Container>
      </Box>
    </>
  );
}
