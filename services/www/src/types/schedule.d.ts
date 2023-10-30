import { StrapiResponseData, Video } from "./strapi";

export interface LiveScheduleByDate {
  date: string;
  videos: StrapiResponseData<Video>[];
}
