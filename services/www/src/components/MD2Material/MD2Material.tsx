'use client';
import {
  Box,
  Typography,
  Divider,
  Link,
} from '@mui/material';
import NextLink from 'next/link';
import ReactMarkdown from 'react-markdown';

export default function MD2Material({
  markdown = '',
}: {
  markdown: string;
}) {
  return (
    <ReactMarkdown
      components={{
        h1: ({ node, ...props }) => (
          <Typography
            component="h1"
            gutterBottom
            {...(props as any)}
            sx={{
              fontSize: theme => theme.typography.h5.fontSize,
              fontWeight: theme => theme.typography.fontWeightBold,
            }}
          />
        ),
        h2: ({ node, ...props }) => (
          <Typography
            component="h2"
            gutterBottom
            {...(props as any)}
            sx={{
              fontSize: theme => theme.typography.h6.fontSize,
              fontWeight: theme => theme.typography.fontWeightBold,
            }}
          />
        ),
        h3: ({ node, ...props }) => (
          <Typography
            component="h3"
            gutterBottom
            {...(props as any)}
            sx={{
              fontSize: theme => theme.typography.h6.fontSize,
              fontWeight: theme => theme.typography.fontWeightMedium,
            }}

          />
        ),
        h4: ({ node, ...props }) => (
          <Typography
            component="h4"
            gutterBottom
            {...(props as any)}
            sx={{
              fontSize: theme => theme.typography.h6.fontSize,
              fontWeight: theme => theme.typography.fontWeightRegular,
            }}
          />
        ),
        h5: ({ node, ...props }) => (
          <Typography
            component="h5"
            gutterBottom
            {...(props as any)}
            sx={{
              fontSize: theme => theme.typography.subtitle1.fontSize,
              fontWeight: theme => theme.typography.fontWeightRegular,
            }}
          />
        ),
        h6: ({ node, ...props }) => (
          <Typography
            component="h6"
            gutterBottom
            {...(props as any)}
            sx={{
              fontSize: theme => theme.typography.subtitle1.fontSize,
              fontWeight: theme => theme.typography.fontWeightRegular,
            }}
          />
        ),
        p: ({ node, ...props }) => (
          <Typography
            variant="body1"
            paragraph
            {...(props as any)}
          />
        ),
        a: ({ node, ...props }) => (
          <Link
            component={NextLink}
            target="_blank"
            color="inherit"
            {...(props as any)}
            sx={{
              color: theme => theme.palette.mBlue.light,
            }}
          />
        ),
        img: ({ node, ...props }) => (
          <Box
            component="img"
            {...(props as any)}
            sx={{
              display: 'block',
              width: '100%',
              maxWidth: theme => theme.spacing(96),
              margin: 'auto',
              ...props.style,
            }}
          />
        ),
        hr: ({ node, ...props }) => (
          <Divider
            {...(props as any)}
            sx={{
              my: theme => theme.spacing(4),
            }}
          />
        ),
      }}
    >
      {markdown}
    </ReactMarkdown>
  );
}
