import {
  Noto_Emoji,
} from 'next/font/google';

export const notoEmoji = Noto_Emoji({
  weight: ['300', '400', '500', '700'],
  subsets: ['emoji'],
  display: 'swap',
})