import { Button } from "antd";
import { FC } from "react";
import { ReloadButtonPropType } from "./ReloadButton.util";
import { ReloadOutlined } from "@ant-design/icons";

const ReloadButtonComponent: FC<ReloadButtonPropType> = ({
  onClick,
  style = {},
  className = "",
}) => {
  return (
    <>
      <Button
        className={`btn-outline-secondary float-right ${className}`}
        icon={<ReloadOutlined />}
        onClick={onClick}
        style={style}
      />
    </>
  );
};

export default ReloadButtonComponent;
