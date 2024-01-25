import Heading1 from "@/components/Heading/Heading1";
import {
  Box,
  Container,
  Paper,
} from "@mui/material";
import ContactForm from "./_components/ContactForm";
import { Metadata } from "next";
import deepmerge from "deepmerge";
import defaultMetadata from "@/constants/defaultMetadata";

export const metadata = deepmerge<Metadata>(
  defaultMetadata,
  {
    title: 'お問い合わせ | 剣城まひる.fans - 非公式ファンサイト',
    openGraph: {
      title: 'お問い合わせ | 剣城まひる.fans - 非公式ファンサイト',
    },
    twitter: {
      title: 'お問い合わせ | 剣城まひる.fans - 非公式ファンサイト',
    },
  }
);

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
