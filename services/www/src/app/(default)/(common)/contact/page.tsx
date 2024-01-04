import Heading1 from "@/components/Heading/Heading1";
import {
  Box,
  Container,
  Paper,
} from "@mui/material";
import ContactForm from "./_components/ContactForm";

export const metadata = {
  title: 'お問い合わせ | 剣城まひる.fans - 非公式ファンサイト',
  description: '個人VTuber『剣城 (つるぎ) まひる』さんの非公式ファンサイト',
};

export default function ContactPage() {
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
              icon="🩹"
              text="お問い合わせ"
            />

            <Box
              px={2}
              py={3}
            >
              <ContactForm
              />
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
}
