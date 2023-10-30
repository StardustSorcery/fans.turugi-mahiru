import { StrapiResponseData, Video } from "./strapi";

export interface LiveSchedule {
  inProgress: StrapiResponseData<Video>[];
  byDate: LiveScheduleByDate[];
}

export interface LiveScheduleByDate {
  date: Date;
  videos: StrapiResponseData<Video>[];
}
