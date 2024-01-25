'use client';
import { SnackbarProvider } from "notistack";

export default function SnackbarRegistry({ children }: { children: React.ReactNode }) {
  return (
    <SnackbarProvider
      maxSnack={1}
    >
      {children}
    </SnackbarProvider>
  )
}
