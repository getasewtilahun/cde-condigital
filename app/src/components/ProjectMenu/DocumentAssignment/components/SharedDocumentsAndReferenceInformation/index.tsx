import { Card, Tabs } from "antd";
import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import ProjectDocumentsComponent from './components/ProjectDocuments/index';
import SharedTemplatesAndParametersComponent from './components/SharedTemplatesAndParameters/index';
import SharedParametrsComponent from './components/SharedParameters/index';
import ReferenceDocumentsComponent from './components/ReferenceDocuments/index';

const SharedDocumentAndReferenceInformationComponent: FC<{}> = ({ }) => {

  const [tab, setTab] = useState("1");

  const onChangeTab = (event: any) => {
    setTab(event);
  };


  return (
    <Card className="plan_tab">
      <Tabs tabPosition="top" activeKey={tab} onChange={onChangeTab}>
        <Tabs.TabPane tab="Project Documents" key="1">
          <ProjectDocumentsComponent />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Shared Templates And Parameters " key="2">
          <SharedTemplatesAndParametersComponent />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Shared Parameters" key="3">
          <SharedParametrsComponent />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Reference Documents" key="4">
          <ReferenceDocumentsComponent />
        </Tabs.TabPane>
      </Tabs>
    </Card>
  );
};

/**
 * Map State to Props
 *
 * @param state
 */
const mapStateToProps = (state: any) => ({

});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(SharedDocumentAndReferenceInformationComponent);
