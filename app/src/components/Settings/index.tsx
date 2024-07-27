import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import Tabs from "antd/lib/tabs";
import { SettingOutlined } from "@ant-design/icons";
import BasicInfoComponent from "./components/BasicInfo/BasicInfo.component";
import CredentialComponent from "./components/Credential/Credential.component";
import { Button, Form, Modal } from "antd";
import DocumentNameSettingComponent from "./components/DocumentNameSetting/DocumentNameSetting.component";
const SettingsComponent: FC<any> = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [basic_info] = Form.useForm();
  const [credential] = Form.useForm();
  const [document_id] = Form.useForm();
  const [tab, setTab] = useState("0");

  const handleOk = () => {
    if (tab === "0") basic_info.submit();
    else if (tab === "1")
      credential.submit();
    else if (tab === "2")
      document_id.submit();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => { }, []);

  return (
    <>
      <Button
        style={{ paddingLeft: "0px", marginTop: "5px" }}
        className="d-block"
        icon={<SettingOutlined />}
        type="link"
        size="middle"
        onClick={() => setIsModalVisible(true)}
      >
        Settings
      </Button>
      <Modal
        style={{ top: 10 }}
        width={800}
        title="Settings"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <>
            <Button
              key="submit"
              type="primary"
              htmlType="submit"
              loading={loading}
              onClick={handleOk}
            >
              Save Changes
            </Button>
          </>,
        ]}
      >
        <Tabs tabPosition="left" onChange={(e: any) => setTab(`${e}`)}>
          <Tabs.TabPane tab="Basic Info" key={0}>
            <BasicInfoComponent
              form={basic_info}
              setIsModalVisible={setIsModalVisible}
              loadingAction={[loading, setLoading]}
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Credential" key={1}>
            <CredentialComponent
              loadingAction={[loading, setLoading]}
              form={credential}
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Document Name Setting" key={2}>
            <DocumentNameSettingComponent
              loadingAction={[loading, setLoading]}
              form={document_id}
            />
          </Tabs.TabPane>
        </Tabs>
      </Modal>
    </>
  );
};
/**
 * Map State to Props
 *
 * @param state
 */
const mapStateToProps = (state: any) => ({
  log: state.log.fetchAll,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
// const mapDispatchToProps = (dispatch: any) => ({
//   fetchLog: (action: any) => dispatch(fetchAllLog(action)),
// });

export default connect(mapStateToProps)(SettingsComponent);
