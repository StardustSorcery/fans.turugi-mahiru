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

export interface News {
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  title: string;
  name: string;
  uniqueName: string;
  thumbnail: {
    data: StrapiResponseData<StrapiMedia> | null;
  };
  body: string;
  targetServices: {
    id: number;
    value: string;
  }[];
  newsTags: {
    data: StrapiResponseData<NewsTag>[];
  };
}

export interface NewsTag {
  displayName: string;
  news: News[];
}

export interface Privacy {
  createdAt: string;
  updatedAt: string;
  body: string;
}
