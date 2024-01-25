'use client';
import { MusicVideo, StrapiResponseData } from "@/types/strapi";
import {
  Button,
  List,
  Menu,
  MenuItem,
  NoSsr,
  Stack,
  StackProps,
  ToggleButton,
  ToggleButtonGroup,
  ToggleButtonGroupProps,
  Toolbar,
} from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import { Sort } from "@mui/icons-material";
import VideoListItem from "@/components/Video/VideoListItem";
import date2str from "@/utils/date2str";

export default function MusicMain({
  defaultCategory = '__all__',
  musicVideos,
  ...props 
}: StackProps<
  any,
  {
    defaultCategory: '__all__' | 'original' | 'cover',
    musicVideos: StrapiResponseData<MusicVideo>[],
  }
>) {
  const [ category, setCategory ] = useState<'__all__' | 'original' | 'cover'>(defaultCategory);
  const handleCategoryChange = useCallback<Exclude<ToggleButtonGroupProps['onChange'], undefined>>((e, value) => {
    setCategory(value);
  }, []);

  const [ sort, setSort ] = useState<'publishedAt:asc' | 'publishedAt:desc'>('publishedAt:desc');
  const [ sortMenuAnchorEl, setSortMenuAnchorEl ] = useState<HTMLButtonElement | null>(null);

  const filteredMusicVideos = useMemo(() => {
    let filtered = [];

    switch(category) {
      case '__all__': {
        filtered = [ ...musicVideos ];
        break;
      }
      case 'original': {
        filtered = musicVideos
          .filter(mv => mv.attributes.originalArtist.authorId === 'youtube:UCSzT-rU62SSiham-g1Dj9yw');
        break;
      }
      case 'cover': {
        filtered = musicVideos
          .filter(mv => mv.attributes.originalArtist.authorId !== 'youtube:UCSzT-rU62SSiham-g1Dj9yw');
        break;
      }
    }

    filtered.sort((a, b) => {
      switch(sort) {
        case 'publishedAt:asc': {
          const publishedAtA = new Date(a.attributes.video.data.attributes.videoPublishedAt || a.attributes.video.data.attributes.scheduledStartsAt || 0);
          const publishedAtB = new Date(b.attributes.video.data.attributes.videoPublishedAt || b.attributes.video.data.attributes.scheduledStartsAt || 0);
          return publishedAtA.getTime() - publishedAtB.getTime();
        }
        case 'publishedAt:desc': {
          const publishedAtA = new Date(a.attributes.video.data.attributes.videoPublishedAt || a.attributes.video.data.attributes.scheduledStartsAt || 0);
          const publishedAtB = new Date(b.attributes.video.data.attributes.videoPublishedAt || b.attributes.video.data.attributes.scheduledStartsAt || 0);
          return publishedAtB.getTime() - publishedAtA.getTime();
        }
      }
    });

    return filtered;
  }, [
    musicVideos,
    category,
    sort,
  ]);

  return (
    <Stack
      {...props}
    >
      <Stack
        flexDirection="row"
        justifyContent="center"
      >
        <ToggleButtonGroup
          color="secondary"
          exclusive
          value={category}
          onChange={handleCategoryChange}
        >
          <ToggleButton
            value="__all__"
          >
            すべて
          </ToggleButton>
          <ToggleButton
            value="original"
          >
            オリジナル楽曲
          </ToggleButton>
          <ToggleButton
            value="cover"
          >
            カバー楽曲
          </ToggleButton>
        </ToggleButtonGroup>
      </Stack>

      <Toolbar
        variant="dense"
      >
        <Button
          color="inherit"
          startIcon={
            <Sort
            />
          }
          onClick={e => {
            setSortMenuAnchorEl(e.currentTarget);
          }}
        >
          並べ替え
        </Button>

        <Menu
          open={sortMenuAnchorEl !== null}
          anchorEl={sortMenuAnchorEl}
          onClose={() => {
            setSortMenuAnchorEl(null);
          }}
        >
          <MenuItem
            selected={sort === 'publishedAt:desc'}
            onClick={() => {
              setSort('publishedAt:desc');
            }}
          >
            公開日 (新しい順)
          </MenuItem>
          <MenuItem
            selected={sort === 'publishedAt:asc'}
            onClick={() => {
              setSort('publishedAt:asc');
            }}
          >
            公開日 (古い順)
          </MenuItem>
        </Menu>
      </Toolbar>

      <List
      >
        {filteredMusicVideos.map((musicVideo) => {
          const video = musicVideo.attributes.video.data;
          const isOriginal = musicVideo.attributes.originalArtist.authorId === 'youtube:UCSzT-rU62SSiham-g1Dj9yw';

          return (
            <VideoListItem
              key={musicVideo.id}
              item={{
                video,
                title: musicVideo.attributes.title,
                subtitle: (
                  video.attributes.videoPublishedAt
                    ? <NoSsr>公開日: {date2str(new Date(video.attributes.videoPublishedAt))}</NoSsr>
                    : undefined
                ),
                tags: [
                  ...(isOriginal
                    ? [
                      'オリジナル楽曲',
                    ]
                    : [
                      'カバー楽曲',
                      `原曲: ${musicVideo.attributes.originalArtist.title}`,
                    ]),
                ],
              }}
            />
          );
        })}
      </List>
    </Stack>
  );
}
