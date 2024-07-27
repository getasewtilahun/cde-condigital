import { Card, Tabs } from "antd";
import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import RequirementsComponent from './components/Requirements/index';
import PlansComponent from './components/Plans/index';
import StandardsComponent from './components/Standards/index';
import ProductionMethodsAndProceduresComponent from './components/ProductionMethodsAndProcedure/index';

const BIMDocumentsComponent: FC<{}> = ({ }) => {

  const [tab, setTab] = useState("1");

  const onChangeTab = (event: any) => {
    setTab(event);
  };


  return (
    <Card className="plan_tab">
      <Tabs tabPosition="top" activeKey={tab} onChange={onChangeTab}>
        <Tabs.TabPane tab="Requirments" key="1">
          <RequirementsComponent />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Plans" key="2">
          <PlansComponent />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Standards" key="3">
          <StandardsComponent />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Production Methods And Procedures" key="4">
          <ProductionMethodsAndProceduresComponent />
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

export default connect(mapStateToProps, mapDispatchToProps)(BIMDocumentsComponent);
