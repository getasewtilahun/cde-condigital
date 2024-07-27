import { Card, Tabs } from "antd";
import { FC, useState } from "react";
import { connect } from "react-redux";
import BIMDocumentsComponent from "./components/BIMDocuments";
import BaseDocumentsComponent from "./components/SharedDocumentsAndReferenceInformation";
import ModelComponent from "./components/Model";
import OtherDocumentsComponent from './components/OtherDocuments/index';

const DocumentAssignmentComponent: FC<{}> = ({ }) => {

  const [tab, setTab] = useState("1");

  const onChangeTab = (event: any) => {
    setTab(event);
  };

  return (
    <>
      <Card className="plan_tab">
        <Tabs tabPosition="top" activeKey={tab} onChange={onChangeTab}>
          <Tabs.TabPane tab="BIM Documents" key="1">
            <BIMDocumentsComponent />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Model" key="2">
            <ModelComponent />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Shared Documents And Reference Information" key="3">
            <BaseDocumentsComponent />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Other Documents" key="4">
            <OtherDocumentsComponent tab={undefined} category={""} folder={""} sub_folder={""} type={""} />
          </Tabs.TabPane>
        </Tabs>
      </Card>
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
)(DocumentAssignmentComponent);
