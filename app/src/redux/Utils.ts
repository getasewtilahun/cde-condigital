export type ApiCallState<T> = {
  error: any;
  payload: T;
  isPending: boolean;
  isSuccessful: boolean;
};

export const resetApiCallState = (payload: any) => ({
  error: null,
  payload: payload,
  isPending: false,
  isSuccessful: false,
});

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

export const InitPagedData = {
  count: 0,
  current_page: 0,
  page_size: 0,
  rows: [],
};

export const InitPagedData2 = {
  count: 0,
  current_page: 0,
  pages: 0,
  limit: 0,
  rows: [],
};

export const formatQuery = (action: any) => {
  let query = "";
  if (action.payload) {
    const keys = Object.keys(action.payload);
    query = keys.map((key) => `${key}=${action.payload[key]}`).join("&");
  }
  return query;
};
