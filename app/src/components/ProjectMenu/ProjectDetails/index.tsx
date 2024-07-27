import { Card, Tabs } from "antd";
import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import OrganizationComponent from './components/Organizations/index';
import ProjectInformationComponent from './components/ProjectInformation/index';
import TeamComponent from './components/Teams/index';

const ProjectDetailsComponent: FC<{}> = ({ }) => {

    const [tab, setTab] = useState("1");

    const onChangeTab = (event: any) => {
        setTab(event);
    };


    return (
        <Card className="plan_tab">
            <Tabs tabPosition="top" activeKey={tab} onChange={onChangeTab}>
                <Tabs.TabPane tab="Project Informations" key="1">
                    <ProjectInformationComponent type={""} tab={""} category={""} folder={""} sub_folder={""} />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Organizations" key="2">
                    <OrganizationComponent type={""} tab={""} category={""} folder={""} sub_folder={""} />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Teams" key="3">
                    <TeamComponent />
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

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetailsComponent);
