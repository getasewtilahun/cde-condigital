import { Card, Tabs } from "antd";
import { FC, Suspense, useState } from "react";
import { connect } from "react-redux";
import LoadingIndicator from "../../common/Loading";
import ReportsTypeComponent from "./ReportsType";

const ReportsComponent: FC<{}> = ({ }) => {
  const [tab, setTab] = useState("1");

  const onChangeTab = (event: any) => {
    setTab(event);
  };

  return (
    <Card className="plan_tab">
      <Tabs tabPosition="top" activeKey={tab} onChange={onChangeTab}>
        <Tabs.TabPane tab="Clash Detection Report" key="1">
          <Suspense fallback={<LoadingIndicator />}>
            <ReportsTypeComponent type={"clash_detection_report"} tab={tab} />
          </Suspense>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Model Quality Check Report" key="2">
          <Suspense fallback={<LoadingIndicator />}>
            <ReportsTypeComponent type={"model_quality_check_report"} tab={tab} />
          </Suspense>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Progress Report" key="3">
          <Suspense fallback={<LoadingIndicator />}>
            <ReportsTypeComponent type={"progress_report"} tab={tab} />
          </Suspense>
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
const mapStateToProps = (state: any) => ({});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ReportsComponent);
