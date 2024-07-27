import { Card, Tabs } from "antd";
import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import ArchitecturalComponent from "./components/Architectural";
import StructuralComponent from "./components/Structural";
import MechanicalComponent from "./components/Mechanical";
import ElectricalComponent from "./components/Electrical";
import PlumbingComponent from "./components/Plumbing";
import FederatedModelComponent from "./components/FederatedModel";
import CivilWorksComponent from './components/CivilWorks/index';

const DesingInformationComponent: FC<{}> = ({ }) => {

  const [tab, setTab] = useState("1");

  const onChangeTab = (event: any) => {
    setTab(event);
  };


  return (
    <Card className="plan_tab">
      <Tabs tabPosition="top" activeKey={tab} onChange={onChangeTab}>
        <Tabs.TabPane tab="Architectural" key="1">
          <ArchitecturalComponent />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Structural" key="2">
          <StructuralComponent />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Civil Works" key="3">
          <CivilWorksComponent />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Mechanical" key="4">
          <MechanicalComponent />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Electrical" key="5">
          <ElectricalComponent />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Plumbing" key="6">
          <PlumbingComponent />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Federated Model" key="7">
          <FederatedModelComponent />
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

export default connect(mapStateToProps, mapDispatchToProps)(DesingInformationComponent);
