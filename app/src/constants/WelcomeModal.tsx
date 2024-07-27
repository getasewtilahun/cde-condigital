import { Button } from "antd";
import WelcomeImage from "../Images/Wel-image.png";
import Modal from "antd/lib/modal/Modal";
import { useState, FC } from "react";
const WelcomeModal: FC<{}> = ({}) => {
  const getIsVisible = () => (localStorage.getItem("is_first") ? false : true);

  const [isModalVisible, setIsModalVisible] = useState(getIsVisible());

  const onCancel = () => {
    localStorage.setItem("is_first", "true");
    setIsModalVisible(false);
  };

  return (
    <>
      <Modal
        style={{ width: "398px" }}
        centered
        visible={isModalVisible}
        onCancel={onCancel}
        onOk={onCancel}
        footer=""
      >
        <div className="tour-parent">
          <img className="tour-image" alt="welcome" src={WelcomeImage}></img>
          <h6 className="tour-welcome">WELCOME</h6>
          <h5 className="tour-title">
            Let's start with a quick <br></br> ConDigital tour
          </h5>
          <h6 className="tour-body">
            We will have you up and running in no time.
          </h6>
          <Button type="primary" onClick={() => onCancel()} className="mt-3">
            Get Started
          </Button>
        </div>
      </Modal>
    </>
  );
};
/**
 * Map State to Props
 *
 * @param state
 */

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */

export default WelcomeModal;
