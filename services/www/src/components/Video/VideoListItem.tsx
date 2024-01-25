'use client';
import { ListItemButton, ListItemButtonProps } from "@mui/material";
import Link from "next/link";
import VideoListItemContent, { VideoListItemContentProps } from "./VideoListItemContent";

export default function VideoListItem({
  item,
  ...props
}: ListItemButtonProps<
  any,
  {
    item: VideoListItemContentProps;
  }
>) {
  const {
    video,
  } = item;

  return (
    <ListItemButton
      LinkComponent={Link}
      target="_blank"
      href={(() => {
        switch(video.attributes.provider) {
          default: return '#';
          case 'youtube': return `https://www.youtube.com/watch?v=${video.attributes.videoId}`;
        }
      })()}
    {...props}
    >
      <VideoListItemContent
        {...item}
      />
    </ListItemButton>
  )
}
