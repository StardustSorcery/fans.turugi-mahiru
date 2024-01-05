'use client';
import React from 'react';
import {
  Box,
  BoxProps,
  Typography,
} from '@mui/material';
import IconQ from '@/svg/IconQandA_Q.svg';
import IconA from '@/svg/IconQandA_A.svg';

export default function QandA({
  question,
  answer,
  answerDetail,
  ...props
}: BoxProps<
  'div',
  {
    question: React.ReactNode;
    answer: React.ReactNode;
    answerDetail: React.ReactNode;
  }
>): React.ReactNode {
  return (
    <Box
      {...props}
    >
      <Box
        mt={1}
        mb={1}
      >
        <Typography
          component="h3"
          sx={{
            display: 'grid',
            gridTemplateColumns: theme => `${theme.spacing(4)} 1fr`,
            gap: theme => theme.spacing(1.5),
            color: theme => theme.palette.mPurple.dark,
            fill: theme => theme.palette.mPurple.dark,
          }}
        >
          <Box
            sx={{
              width: theme => theme.spacing(4),
              height: theme => theme.spacing(4),
            }}
          >
            <IconQ
              width="100%"
              height="100%"
            />
          </Box>
          <Typography
            component="span"
            sx={{
              fontSize: theme => theme.typography.h6.fontSize,
              fontWeight: theme => theme.typography.fontWeightBold,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {question}
          </Typography>
        </Typography>
      </Box>
      
      <Box
      >
        <Box
          mt={1}
          mb={1}
        >
          <Typography
            component="div"
            color="secondary"
            sx={{
              display: 'grid',
              gridTemplateColumns: theme => `${theme.spacing(4)} 1fr`,
              gap: theme => theme.spacing(1.5),
              color: theme => theme.palette.mRed.main,
              fill: theme => theme.palette.mRed.main,
            }}
          >
            <Box
              sx={{
                width: theme => theme.spacing(4),
                height: theme => theme.spacing(4),
              }}
            >
              <IconA
                width="100%"
                height="100%"
              />
            </Box>
            <Typography
              component="span"
              sx={{
                fontSize: theme => theme.typography.h6.fontSize,
                fontWeight: theme => theme.typography.fontWeightBold,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {answer}
            </Typography>
          </Typography>
        </Box>

        <Typography
          variant="body1"
          component={typeof answerDetail === 'string' ? 'p' : 'div'}
        >
          {answerDetail}
        </Typography>
      </Box>
    </Box>
  );
};
