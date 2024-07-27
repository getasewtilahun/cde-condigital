import { toNumber } from "lodash";
export const getPagingData = (
  data: any,
  current_page: number = 0,
  limit: number
) => {
  const { count, rows } = data;

  const page_size = Math.ceil(count / limit);

  current_page = current_page / limit + 1;

  return { count, rows, page_size, current_page };
};

export const getPagingData2 = (
  data: any,
  current_page: number = 0,
  limit: number
) => {
  const { count, rows } = data;

  const pages = Math.ceil(count / limit);

  current_page = current_page / limit + 1;

  return { count, rows, pages, current_page, limit };
};

export const getPagination = (query: any) => {
  const { limit = 10, offset = 1 } = query;

  return {
    limit: toNumber(limit),
    offset: (toNumber(offset) - 1) * toNumber(limit),
  };
};

export type PagedData<T> = {
  count: number;
  rows: T;
  page_size: number;
  current_page: number;
};

export type PagedData2<T> = {
  count: number;
  rows: T;
  pages: number;
  current_page: number;
  limit: number;
};
