'use client';
import {
  useState,
} from 'react';
import {
  Box,
  IconButton,
  IconButtonProps,
  Popover,
  PopoverProps,
} from '@mui/material';
import {
  HelpOutlined,
} from '@mui/icons-material';

export function Hint({
  hint,
  disabled,
  ButtonProps,
  PopoverProps,
}: {
  hint: React.ReactNode;
  disabled?: boolean;
  ButtonProps?: IconButtonProps;
  PopoverProps?: Omit<PopoverProps, 'open'>;
}) {
  const [ anchorEl, setAnchorEl ] = useState<HTMLButtonElement | null>(null);

  return (
    <>
      <IconButton
        disabled={disabled}
        onMouseEnter={e => {
          setAnchorEl(e.currentTarget);
        }}
        onMouseLeave={() => {
          setAnchorEl(null);
        }}
        {...ButtonProps}
      >
        <HelpOutlined
        />
      </IconButton>

      {hint && (
        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          onClose={() => {
            setAnchorEl(null);
          }}
          disableRestoreFocus
          {...PopoverProps}
          sx={{
            pointerEvents: 'none',
            ...(PopoverProps?.sx),
          }}
        >
          <Box
            p={2}
          >
            {hint}
          </Box>
        </Popover>
      )}
    </>
  );
}
