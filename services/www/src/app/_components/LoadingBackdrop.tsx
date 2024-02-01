'use client';

import { Backdrop } from "@mui/material";
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
      <Backdrop
        open={isLoading}
        sx={{
          backgroundColor: theme => theme.palette.primary.main,
        }}
      />

      {children}
    </>
  );
}
