import { Form, Input, Select } from "antd";
import { isEmpty } from "lodash";
import { FC, useEffect } from "react";
import { connect } from "react-redux";
import { fetchAllUser } from "../../../redux/User/User.action";
import { searchProp } from "../../../utilities/utilities";
import { ApprovalFormItemPropType } from "./ApprovalFormItem.util";
const ApprovalFormItemComponent: FC<ApprovalFormItemPropType> = ({
  fetchUsers,
  users,
  is_inventory,
  issued,
  approverOnly,
  checkerOnly,
  featureUsers,
  fetchFeatureUser,
  approvingUser,
  checkingUser,
  approver_required = false,
  has_checked_by = false,
}) => {
  useEffect(() => {
    if (isEmpty(users.payload)) fetchUsers();

    if (
      (approverOnly || checkerOnly) &&
      fetchFeatureUser &&
      !featureUsers?.isPending
    )
      fetchFeatureUser();
  }, []);

  return (
    <>
      <div className="col-md-4">
        <Form.Item label="Prepared By" name="prepared_by">
          <Input disabled />
        </Form.Item>
      </div>
      <div className="col-md-4">
        <Form.Item
          label={issued ? "Issued By" : "Delivered By"}
          name={"issued_by"}
        >
          <Select {...searchProp}>
            {users.payload.map((e, index) => (
              <Select.Option key={index} value={e.id.toString()}>
                {e.full_name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </div>
      {is_inventory ? (
        <>
          <div className="col-md-4">
            <Form.Item label="Received By" name="received_by">
              <Select {...searchProp}>
                {users.payload.map((e, index) => (
                  <Select.Option key={index} value={e.id}>
                    {e.full_name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </div>

          {has_checked_by && (
            <div className="col-md-4">
              <Form.Item
                label="Checked By"
                name="checked_by"
                rules={[
                  {
                    required: approver_required,
                    message: "Required",
                  },
                ]}
              >
                {checkerOnly ? (
                  <Select
                    {...searchProp}
                    placeholder="Name"
                    loading={featureUsers?.isPending}
                  >
                    {featureUsers?.payload
                      .filter((e) => e?.user_role?.user_accesses?.[0].check)
                      ?.map((e, index) => (
                        <Select.Option key={index} value={e.id}>
                          {e.full_name}
                        </Select.Option>
                      ))}
                  </Select>
                ) : (
                  <Select {...searchProp} placeholder="Name">
                    {(checkingUser ? checkingUser : users.payload)?.map(
                      (e, index) => (
                        <Select.Option key={index} value={e.id}>
                          {e.full_name}
                        </Select.Option>
                      )
                    )}
                  </Select>
                )}
              </Form.Item>
            </div>
          )}

          <div className="col-md-4">
            <Form.Item
              label="Approved By"
              name="approved_by"
              rules={[
                {
                  required: approver_required,
                  message: "Required",
                },
              ]}
            >
              {approverOnly ? (
                <Select
                  {...searchProp}
                  placeholder="Name"
                  loading={featureUsers?.isPending}
                >
                  {featureUsers?.payload
                    .filter((e) => e?.user_role?.user_accesses?.[0].approve)
                    ?.map((e, index) => (
                      <Select.Option key={index} value={e.id}>
                        {e.full_name}
                      </Select.Option>
                    ))}
                </Select>
              ) : (
                <Select {...searchProp} placeholder="Name">
                  {(approvingUser ? approvingUser : users.payload)?.map(
                    (e, index) => (
                      <Select.Option key={index} value={e.id}>
                        {e.full_name}
                      </Select.Option>
                    )
                  )}
                </Select>
              )}
            </Form.Item>
          </div>
        </>
      ) : null}
    </>
  );
};

/**
 * Map State to Props
 *
 * @param state
 */
const mapStateToProps = (state: any) => ({
  users: state.user.fetchAll,
  featureUsers: state.user.fetchFeature,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchUsers: () => dispatch(fetchAllUser()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApprovalFormItemComponent);
