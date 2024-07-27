import { FC, useEffect } from "react";
import { LayoutPropType } from "./Layout.utils";

import "./Layout.css";
import HeaderComponent from "../Header/Header.component";
import { connect } from "react-redux";
import { fetchAllUserSeen } from "../../../redux/UserSeen/UserSeen.action";
import { Layout } from "antd";

const { Header, Content, Footer } = Layout;
const LayoutComponent: FC<LayoutPropType> = ({ children, fetchUserSeen }) => {
  useEffect(() => {
    fetchUserSeen();
  }, [fetchUserSeen]);

  return (
    <div>
      <Layout style={{ minHeight: "100vh" }} className="body">
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            <HeaderComponent />
          </Header>
          <Content className="mt-4 mb-0 limit-container">
            {/* <HeaderMenuComponent /> */}
            {children}
          </Content>
          <Footer
            style={{
              textAlign: "center",
              position: "relative",
              backgroundColor: "#f3f6fc",
            }}
          >
            ConDigital, Inc.
          </Footer>
        </Layout>
        {/* </div> */}
      </Layout>{" "}
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
const mapDispatchToProps = (dispatch: any) => ({
  fetchUserSeen: (action: any) => dispatch(fetchAllUserSeen(action)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LayoutComponent);
