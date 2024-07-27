import { Card, Tabs } from "antd";
import { FC, Suspense, useEffect, useState } from "react";
import { connect } from "react-redux";
import LoadingIndicator from "../../common/Loading";
import ReviewForApprovalComponent from "./components/ReviewForApproval";
import RequestForInformationComponent from "./components/RequestForInformation";
import ScheduleMeetingComponent from "./components/ScheduleMeeting";
import CommunicationPanel from './../Communication/components/Message/Communication/';

const CommunicationComponent: FC<{}> = ({ }) => {
  const [tab, setTab] = useState("1");

  const onChangeTab = (event: any) => {
    setTab(event);
  };

  useEffect(() => { }, []);

  return (
    <Card className="plan_tab">
      <Tabs tabPosition="top" activeKey={tab} onChange={onChangeTab}>
        <Tabs.TabPane tab="Review for Approval" key="1">
          <Suspense fallback={<LoadingIndicator />}>
            <ReviewForApprovalComponent
              category={"Communication"}
              folder={""}
              sub_folder={""}
              type={""}
              tab={tab}
            />
          </Suspense>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Request for Information" key="2">
          <Suspense fallback={<LoadingIndicator />}>
            <RequestForInformationComponent tab={tab} />
          </Suspense>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Schedule Meeting" key="3">
          <Suspense fallback={<LoadingIndicator />}>
            <ScheduleMeetingComponent tab={tab} />
          </Suspense>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Messages" key="4">
          <Suspense fallback={<LoadingIndicator />}><CommunicationPanel /></Suspense>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommunicationComponent);
