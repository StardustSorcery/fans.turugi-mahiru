'use client';

import { Box } from "@mui/material";
import { useEffect, useState } from "react";

export default function LoadingBackdrop({
  children,
}: {
  children: React.ReactNode;
}) {
  const [ isLoading, setIsLoading ] = useState<boolean>(true);
  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <>
      {children}

      <Box
        sx={{
          position: 'fixed',
          inset: 0,
          zIndex: theme => theme.zIndex.tooltip + 100,
          backgroundColor: theme => theme.palette.primary.main,
          visibility: isLoading ? 'visible' : 'hidden',
        }}
      />
    </>
  );
}
