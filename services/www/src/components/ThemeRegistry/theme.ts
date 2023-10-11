import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const baseTheme = createTheme({
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  shape: {
    borderRadius: 12,
  },
});

const mColorSet = {
  yellow: baseTheme.palette.augmentColor({
    name: 'mYellow',
    color: {
      main: '#fdcf00',
    },
  }),
  purple: baseTheme.palette.augmentColor({
    name: 'mPurple',
    color: {
      main:'#8159de',
    },
  }),
  red: baseTheme.palette.augmentColor({
    name: 'mRed',
    color: {
      main: '#da073e',
    },
  }),
  blue: baseTheme.palette.augmentColor({
    name: 'mBlue',
    color: {
      main: '#014da1',
    },
  }),
};

const theme = createTheme(baseTheme, {
  palette: {
    mode: 'light',
    primary: mColorSet.yellow,
    secondary: mColorSet.purple,
    background: {
      default: mColorSet.yellow.main,
    },
    mYellow: mColorSet.yellow,
    mPurple: mColorSet.purple,
    mRed: mColorSet.red,
    mBlue: mColorSet.blue,
  },
});

export default theme;
