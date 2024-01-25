import {
  Noto_Emoji,
  Noto_Color_Emoji,
} from 'next/font/google';

export const notoEmoji = Noto_Emoji({
  weight: ['300', '400', '500', '700'],
  subsets: ['emoji'],
  display: 'swap',
  adjustFontFallback: false,
});

export const notoColorEmoji = Noto_Color_Emoji({
  weight: ['400'],
  subsets: ['emoji'],
  display: 'swap',
  adjustFontFallback: false,
})
