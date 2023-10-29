export interface StrapiResponseMeta {
  pagination?: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  } & {
    start: number;
    limit: number;
    total: number;
  };
  [key: string]: any;
}

export type StrapiResponseData<T> = {
  id: number;
  attributes: T;
  meta: {
    [key: string]: any;
  };
};

export interface StrapiMedia {
  url: string;
  width: number;
  height: number;
  mime: string;
  ext: string;
}

export interface Video {
  provider: string;
  videoId: string;
  type: 'LiveStream' | 'UploadedVideo';
  title: string;
  description: string;
  thumbnails: {
    url: string;
    width: number;
    height: number;
  }[];
  author: {
    authorId: string | null;
    title: string | null;
  };
  isInProgressLiveStream: boolean;
  isUpcomingLiveStream: boolean;
  videoPublishedAt: Date | null;
  scheduledStartsAt: Date | null;
  scheduledEndsAt: Date | null;
  startedAt: Date | null;
  endedAt: Date | null;
  client: string;
  etag: string;
  raw: any;
}
