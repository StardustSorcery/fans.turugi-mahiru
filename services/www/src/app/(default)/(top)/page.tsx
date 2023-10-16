import {
  Box,
  Container,
  Paper,
} from "@mui/material";
import Top from "./_components/Top";
import TabNavigation from "@/components/TabNavigation/TabNavigation";

export default function TopPage() {
  return (
    <>
      <Top
      />

      <TabNavigation
        centered
      />

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
            sx={{
              minHeight: '100svh',
            }}
          >
          </Box>
        </Container>
      </Box>
    </>
  );
}
