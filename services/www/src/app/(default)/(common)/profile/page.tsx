import {
  Box,
  Container,
  Paper,
} from "@mui/material";
import Profile from "./_components/Profile";

export const metadata = {
  title: 'プロフィール | 剣城まひる.fans - 非公式ファンサイト',
  description: 'VTuber『剣城 (つるぎ) まひる』さんの非公式ファンサイト',
};

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
