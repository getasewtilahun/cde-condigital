import { Image } from "antd";
import Text from "antd/lib/typography/Text";
import { FC } from "react";
import { BASE_URI } from "../../../redux/ApiCall";
import { getInitials } from "../../../utilities/utilities";
import { SignaturePropType } from "./Signature.util";
 
const SignatureComponent: FC<SignaturePropType> = ({ user }) => {
  const Render = () => {
    if (user) {
      if (user.signature) {
        return (
          <Image
            width={120}
            preview={false}
            src={BASE_URI + "/" + user.signature.signature_url}
          />
        );
      } else return <Text italic>{getInitials(user.full_name)}</Text>;
    } else return <Text italic>-</Text>;
  };

  return (
    <>
      <Render />
    </>
  );
};

export default SignatureComponent;
