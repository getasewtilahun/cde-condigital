import React, { FC } from "react";
import {Image } from "antd";

type ImagePreviewProps = {
  setVisible: Function;
  visible: boolean;
  src: string;
};
const ImagePreview: FC<ImagePreviewProps> = ({ src, setVisible, visible }) => {
  return (
    <Image
      width={200}
      style={{ display: "none" }}
      src={src}
      preview={{
        visible,
        src: src,
        onVisibleChange: (value) => {
          setVisible(value);
        },
      }}
    />
  );
};

export default ImagePreview;
