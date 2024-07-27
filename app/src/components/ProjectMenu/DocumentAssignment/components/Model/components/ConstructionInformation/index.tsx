import { Card, Tabs } from "antd";
import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import ConstructionPlan from "./components/ConstructionPlan";
import CostEstimation from "./components/CostEstimation";
import QuantitySurveying from "./components/QuantitySurveying";
import SiteLayout from "./components/SiteLayout";

const ConstructionInformationComponent: FC<{}> = ({ }) => {

  const [tab, setTab] = useState("1");

    const onChangeTab = (event: any) => {
      setTab(event);
    };


    return (
        <Card className="plan_tab">
          <Tabs tabPosition="top" activeKey={tab} onChange={onChangeTab}>
            <Tabs.TabPane tab="Site layout and temporary structures" key="1">
              <SiteLayout />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Construction plan and simulations" key="2">
              <ConstructionPlan />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Quantity Surveying" key="3">
              <QuantitySurveying />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Cost Estimation" key="4">
              <CostEstimation />
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

export default connect(mapStateToProps, mapDispatchToProps)(ConstructionInformationComponent);
