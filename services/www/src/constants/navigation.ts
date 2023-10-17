export interface NavigationItem {
  label: string;
  labelEN: string;
  labelJA: string;
  href: string;
}

export const navigation: NavigationItem[] = [
  {
    label: 'PROFILE',
    labelEN: 'PROFILE',
    labelJA: 'プロフィール',
    href: '/profile',
  },
  {
    label: 'NEWS',
    labelEN: 'NEWS',
    labelJA: 'ニュース',
    href: '/news',
  },
  {
    label: 'MUSIC',
    labelEN: 'MUSIC',
    labelJA: 'ミュージック',
    href: '/music',
  },
  {
    label: 'RANKING',
    labelEN: 'RANKING',
    labelJA: 'ランキング',
    href: '/ranking',
  },
  {
    label: 'SCHEDULE',
    labelEN: 'SCHEDULE',
    labelJA: 'スケジュール',
    href: '/schedule',
  },
];
