import { Card, Tabs } from "antd";
import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import AppointingParty from "./components/AppointingParty";
import LeadAppointedParty from "./components/LeadAppointedParty";
import AppointedParty from "./components/AppointedParty";
import OtherProjectMemeber from "./components/OtherProjectMemeber";

const ProjectDetailsComponent: FC<{}> = ({ }) => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const initialTab = queryParams.get("tab") || "1";

    const [tab, setTab] = useState(initialTab);

    const onChangeTab = (event: any) => {
        setTab(event);
    };

    useEffect(() => {
        setTab(initialTab);
    }, [initialTab]);

    return (
        <Card className="plan_tab">
            <Tabs tabPosition="left" activeKey={tab} onChange={onChangeTab}>
                <Tabs.TabPane tab="Appointing party" key="1">
                    <AppointingParty />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Lead Appointed Party" key="2">
                    <LeadAppointedParty />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Appointed Party" key="3">
                    <AppointedParty />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Other Project Members" key="4">
                    <OtherProjectMemeber />
                </Tabs.TabPane>
            </Tabs>
        </Card>
    );
};

const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = (dispatch: any) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetailsComponent);
