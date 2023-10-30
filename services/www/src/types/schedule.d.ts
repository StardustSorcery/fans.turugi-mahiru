import { StrapiResponseData, Video } from "./strapi";

export interface LiveScheduleByDate {
  date: Date;
  videos: StrapiResponseData<Video>[];
}
