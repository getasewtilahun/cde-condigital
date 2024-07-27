import React, { FC, useState, useMemo } from "react";
import { connect } from "react-redux";
import { Button, Image } from "antd";
import { DocumentViewerPropType, getFileType } from "./DocumentViewer.util";
import { BASE_URI } from "../../../redux/ApiCall";
import { EyeOutlined } from "@ant-design/icons";

const DocumentViewerComponent: FC<DocumentViewerPropType> = ({
  document,
  name,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const docUrl = useMemo(() => `${BASE_URI}/${document.url}`, [document.url]);

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const RenderImage = () => {
    return (
      <Image
        src={docUrl}
        style={{ display: "none" }}
        preview={{
          visible: isModalVisible,
          src: docUrl,
          onVisibleChange: (value: boolean) => setIsModalVisible(value),
        }}
      />
    );
  };

  const fileType = getFileType(document.url)?.toLowerCase();
  const isImage = fileType === "png" || fileType === "jpg" || fileType === "jpeg";
  const isDocument = fileType === "docx" || fileType === "pdf";

  return (
    <>
      {(isImage || isDocument) && (
        <>
          <Button
            type="link"
            href={isDocument ? docUrl : undefined}
            target={isDocument ? "_blank" : undefined}
            onClick={() => {
              if (isImage) {
                setIsModalVisible(true);
              }
            }}
            icon={name ? undefined : <EyeOutlined />}
          >
            {name}
          </Button>
          {isImage && <RenderImage />}
        </>
      )}
    </>
  );
};

const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = (dispatch: any) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(DocumentViewerComponent);
