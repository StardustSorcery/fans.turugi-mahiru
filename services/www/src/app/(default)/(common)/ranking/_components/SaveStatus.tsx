'use client';
import {
  Box,
  Stack,
  Typography,
  CircularProgress,
  StackProps,
} from '@mui/material';
import {
  CloudDoneOutlined,
  WarningAmberOutlined,
} from '@mui/icons-material';

export function SaveStatus({
  status = 'none',
  ...props
}: StackProps<
  any,
  {
    status: 'none' | 'saving' | 'saved' | 'failed';
  }
>) {
  return (
    <Stack
      flexDirection="row"
      alignItems="center"
      gap={1}
      {...props}
    >
      {status !== 'none' && (
        <>
          {{
            saving: (
              <Box
                sx={{
                  width: 24,
                  height: 24,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <CircularProgress
                  color="secondary"
                  size={18}
                />
              </Box>
            ),
            saved: (
              <CloudDoneOutlined
                sx={{
                  color: theme => theme.palette.text.secondary,
                }}
              />
            ),
            failed: (
              <WarningAmberOutlined
                sx={{
                  color: theme => theme.palette.error.main,
                }}
              />
            ),
          }[status]}

          <Typography
            component="span"
            variant="body2"
            color={{
              saving: 'textSecondary',
              saved: 'textSecondary',
              failed: 'error',
            }[status]}
          >
            {{
              saving: '保存中...',
              saved: '保存しました',
              failed: '保存中にエラーが発生しました',
            }[status]}
          </Typography>
        </>
      )}
    </Stack>
  );
}
