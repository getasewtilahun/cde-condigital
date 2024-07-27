import { FC, useEffect, useState } from "react";
import { Card, Tabs } from "antd";
import { connect } from "react-redux";
import WIPComponent from "../../../DesingInformation/components/Architectural/components/WIP";
import SharedComponent from "../../../DesingInformation/components/Architectural/components/Shared";
import PublishedComponent from "../../../DesingInformation/components/Architectural/components/Published";
import ArchivedComponent from './../../../DesingInformation/components/Architectural/components/Archived/index';


const ConstructionPlan: FC<{}> = ({ }) => {

  const [tab, setTab] = useState("1");

  const onChangeTab = (event: any) => {
    setTab(event);
  };

  return (
    <Card className="plan_tab">
      <Tabs tabPosition="top" activeKey={tab} onChange={onChangeTab}>
        <Tabs.TabPane tab="WIP" key="1">
          <WIPComponent
            category={"Model"}
            folder={"3.2 Construction information"}
            sub_folder={"Construction plan and simulations"}
            type={"WIP"}
            tab={tab}
          />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Shared" key="2">
          <SharedComponent
            category={"Model"}
            folder={"3.2 Construction information"}
            sub_folder={"Construction plan and simulations"}
            type={""}
            tab={tab}
          />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Published" key="3">
          <PublishedComponent
            category={"Model"}
            folder={"3.2 Construction information"}
            sub_folder={"Construction plan and simulations"}
            type={""}
            tab={tab}
          />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Archived" key="4">
          <ArchivedComponent
            category={"Model"}
            folder={"3.2 Construction information"}
            sub_folder={"Construction plan and simulations"}
            type={""}
            tab={tab}
          />
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

export default connect(mapStateToProps, mapDispatchToProps)(ConstructionPlan);
