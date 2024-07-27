import { EyeOutlined } from "@ant-design/icons";
import { Button, Image } from "antd";
import { last } from "lodash";
import { FC, useState } from "react";
import { connect } from "react-redux";
import { BASE_URI } from "../../../../../../../../../redux/ApiCall";

export type DocumentViewerPropType = {
  document: { url: string };
  disabled?: boolean;
};

export const getFileType = (url: string) => {
  if (url) {
    const split = url.split(".");
    return last(split);
  } else return "";
};

const DocumentViewerComponent: FC<DocumentViewerPropType> = ({
  document,
  disabled,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const Render = () => {
    if (
      getFileType(document.url)?.toLowerCase() === "png" ||
      getFileType(document.url)?.toLowerCase() === "jpg"
    ) {
      return (
        <Image
          src={`${BASE_URI}/${document.url}`}
          style={{ display: "none" }}
          preview={{
            visible: isModalVisible,
            src: `${BASE_URI}/${document.url}`,
            onVisibleChange: (value: boolean | ((prevState: boolean) => boolean)) => {
              setIsModalVisible(value);
            },
          }}
        />
      );
    }
  };

  return (
    <>
      {getFileType(document.url)?.toLowerCase() === "png" ||
        getFileType(document.url)?.toLowerCase() === "jpg" ||
        getFileType(document.url)?.toLowerCase() === "pdf" ? (
        <>
          <Button
            disabled={disabled ?? false}
            type="text"
            {...(getFileType(document.url)?.toLowerCase() === "pdf"
              ? { href: `${BASE_URI}/${document.url}` }
              : null)}
            target={"_blank"}
            icon={<EyeOutlined />}
            onClick={() => {
              setIsModalVisible(true);
            }}
            style={{
              color: "black",
              lineHeight: "25px",
            }}
          ></Button>
          {Render()}
        </>
      ) : null}
    </>
  );
};

/**
 * Map State to Props
 *
 * @param state
 */
const mapStateToProps = (state: any) => ({});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DocumentViewerComponent);
