import type {
  PaletteColor,
  PaletteColorOptions,
} from "@mui/material";

declare module '@mui/material/styles' {
  interface Palette {
    mYellow: PaletteColor;
    mPurple: PaletteColor;
    mRed: PaletteColor;
    mBlue: PaletteColor;
  }

  interface PaletteOptions {
    mYellow: PaletteColorOptions;
    mPurple: PaletteColorOptions;
    mRed: PaletteColorOptions;
    mBlue: PaletteColorOptions;
  }
}
