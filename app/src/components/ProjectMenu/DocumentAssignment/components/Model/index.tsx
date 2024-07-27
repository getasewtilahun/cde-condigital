import { Card, Tabs } from "antd";
import { FC, useState } from "react";
import DesingInformationComponent from "./components/DesingInformation";
import ConstructionInformationComponent from "./components/ConstructionInformation";

const ModelComponent: FC<{}> = ({ }) => {
  const [tab, setTab] = useState("1");

  const onChangeTab = (event: any) => {
    setTab(event);
  };

  return (
    <Card className="plan_tab">
      <Tabs tabPosition="left" activeKey={tab} onChange={onChangeTab}>
        <Tabs.TabPane tab="3.1 Desing Information" key="1">
          <DesingInformationComponent />
        </Tabs.TabPane>
        <Tabs.TabPane tab="3.2 Construction Information" key="2">
          <ConstructionInformationComponent />
        </Tabs.TabPane>
      </Tabs>
    </Card>
  );
};

export default ModelComponent;
