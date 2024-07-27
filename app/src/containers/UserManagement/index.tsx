import { FC, useEffect, useState } from "react";

import { connect } from "react-redux";

import Card from "antd/lib/card";

import UserManagementComponent from "../../components/User/UserManagement";
import { Tabs } from "antd";
import { UserTabs } from "../../constants/Constants";
import { useHistory, useParams } from "react-router";
import { RouteConstants } from "../../router/Constants";
import { getUrl } from "../../utilities/utilities";
import UserRole from "../../components/User/UserRole";

const UserComponent: FC<{}> = () => {
  const [selected_tab, setTab] = useState(
    UserTabs.USER_MATRIX.toLocaleLowerCase().split(" ").join("-")
  );

  const onChangeTab = (event: any) => {
    history.push(RouteConstants.USER_MANAGEMENT.replace(":tab", event));
  };

  const history = useHistory();
  const { tab }: any = useParams();

  useEffect(() => {
    setTab(tab);
  }, [tab]);

  useEffect(() => {
    if (tab === ":tab")
      history.push(
        RouteConstants.USER_MANAGEMENT.replace(
          ":tab",
          UserTabs.USER_MATRIX.toLocaleLowerCase().split(" ").join("-")
        )
      );
  }, [tab]);

  return (
    <>
      <Card>
        <Tabs
          type="card"
          activeKey={selected_tab}
          onChange={onChangeTab}
          items={[
            {
              key: getUrl(UserTabs.USER_MATRIX),
              label: UserTabs.USER_MATRIX,
              children: <UserRole />,
            },

            {
              key: getUrl(UserTabs.USER_REGISTRATION),
              label: UserTabs.USER_REGISTRATION,
              children: <UserManagementComponent />,
            },
          ]}
        />
      </Card>
    </>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserComponent);
