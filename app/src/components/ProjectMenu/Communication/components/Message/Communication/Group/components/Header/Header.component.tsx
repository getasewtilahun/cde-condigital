import { Tooltip } from "antd";
import { FC, useEffect } from "react";
import { connect } from "react-redux";
import { getUserData } from "../../../../../../../../../utilities/utilities";
import AddCommunicationGroupComponent from "../AddGroup/AddCommunicationGroup";

const HeaderComponent: FC<{}> = ({ }) => {
  useEffect(() => { }, []);

  return (
    <div className="border-bottom border-right px-3 py-3 d-flex flex-row align-items-center justify-content-between">
      <h4 style={{ fontFamily: "Campton-Bold", marginBottom: "5px" }}>
        Groups
      </h4>

      <div>
        {getUserData().is_super_user && <AddCommunicationGroupComponent />}
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
