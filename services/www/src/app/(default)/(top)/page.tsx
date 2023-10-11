import {
  Box,
  Paper,
} from "@mui/material";
import Top from "./_components/Top";

export default function TopPage() {
  return (
    <>
      <Top
      />

      <Box
        component={Paper}
        elevation={6}
        sx={{
          minHeight: '100svh',
          borderBottomRightRadius: 0,
          borderBottomLeftRadius: 0,
          mx: 2,
        }}
      >
      </Box>
    </>
  );
}
