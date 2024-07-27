import { FC, useState } from "react";
import { Popover, Button, Divider, Avatar } from "antd";
import { useHistory } from "react-router-dom";
import { getInitials, getUserData, logout } from "../../../utilities/utilities";
import { RouteConstants } from "../../../router/Constants";
import { UserAddOutlined } from "@ant-design/icons";
import Logo from "../../../Images/ConDigitalAvatar.svg";
import HeaderMenuComponent from "./HeaderMenu.component";
import { connect } from "react-redux";
import LogComponent from "../../../components/Log/Log.component";
import SettingsComponent from "../../../components/Settings";
import WelcomeModal from "../../../constants/WelcomeModal";

const HeaderComponent: FC<{}> = () => {
  const history = useHistory();

  const [data] = useState(getUserData());

  return (
    <div className="limit-container">
      <WelcomeModal />
      <div className="row">
        <div className="header-wrapper">
          <div className="header-breadcrumb">
            <img
              src={Logo}
              alt="Logo"
              style={{ width: "45px", marginTop: "7px" }}
            />
          </div>
          <HeaderMenuComponent />
          <div className="header-icons">
            {data.is_super_user ? (
              <Button
                className="pt-2"
                type="link"
                icon={<UserAddOutlined />}
                onClick={(e: any) => history.push(RouteConstants.USER_MANAGEMENT)}
              />
            ) : null}

            <LogComponent />

            <Popover
              overlayClassName="header-popover"
              placement="bottomRight"
              content={
                <>
                  <h6 className="con-user">{data ? data.full_name : null}</h6>
                  <SettingsComponent />
                  <Divider style={{ marginBottom: "13px" }} />
                  <Button
                    style={{
                      paddingLeft: "0px",
                      marginTop: "0px",
                      paddingTop: "0px",
                    }}
                    className="btn btn-link"
                    onClick={() => {
                      logout();
                      history.push(RouteConstants.LOGIN);
                    }}
                  >
                    Sign Out
                  </Button>
                </>
              }
              trigger="hover"
            >
              <Avatar style={{ color: "#fff", backgroundColor: "#0033a1" }}>
                {getInitials(data.full_name)}
              </Avatar>
            </Popover>
          </div>
        </div>
      </div>
    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);
