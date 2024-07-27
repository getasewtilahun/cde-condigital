import Button from "antd/lib/button";
import Modal from "antd/lib/modal/Modal";
import { useState } from "react";

const AboutComponent = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button type="link" onClick={showModal} style={{color:"#8c98a4"}}>
        About
      </Button>

      <Modal
        className="About-modal"
        style={{ top: 10 }}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[]}
        // width={1300}
      >
        <h5 className="text-center">About</h5>
        <p>
          {`ConDigital is a construction project management software licensed
          under ConDigital, Inc. If you want to know more about the platform
          before using it please go to our website www.condigitaleth.com  For any
          questions, comments or suggestion use the email info@condigitaleth.com
          or +251-985-45-67-20 | +251-925-76-44-40 | +251-913-89-78-99 Any
          unlawful distribution or copyright issues are legally prohibited.`}
        </p>
      </Modal>
    </>
  );
};
export default AboutComponent;
