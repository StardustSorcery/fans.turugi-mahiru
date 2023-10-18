import {
  Box,
  Container,
  Paper,
} from "@mui/material";
import Top from "./_components/Top";
import SideNavTriggerWrapper from "./_components/SideNavTriggerWrapper";
import TabNavigationWrapper from "./_components/TabNavigationWrapper";

export default function TopPage() {
  return (
    <>
      <SideNavTriggerWrapper
      />

      <Top
      />

      <TabNavigationWrapper
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
