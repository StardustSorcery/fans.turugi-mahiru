export type StrapiResponseData<T> = {
  id: number;
  attributes: T;
  meta: {
    [key: string]: any;
  };
};

export interface News {
  title: string;
  name: string;
  uniqueName: string;
  body: string;
  targetServices: {
    value: string;
  }[];
  newsTags: NewsTag[];
}

export interface NewsTag {
  displayName: string;
  news: News[];
}
