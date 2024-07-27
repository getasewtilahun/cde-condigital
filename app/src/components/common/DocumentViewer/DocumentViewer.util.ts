import { last } from "lodash";
export type DocumentViewerPropType = {
  document: { url: string };
  name?: any;
};

export const getFileType = (url: string) => {
  if (url) {
    const split = url.split(".");
    return last(split);
  } else return "";
};
