import { BellOutlined } from "@ant-design/icons";
import { Badge, DatePicker, Form, Input, Tag } from "antd";
import Button from "antd/lib/button";
import Modal from "antd/lib/modal/Modal";
import Table, { ColumnsType } from "antd/lib/table";
import moment from "moment";
import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchAllLog } from "../../redux/Log/Log.action";
import { setUserSeen } from "../../redux/UserSeen/UserSeen.action";
import { getUserData } from "../../utilities/utilities";
import { LogPropType, parseData } from "./Log.util";

const LogComponent: FC<LogPropType> = ({
  fetchLog,
  log,
  user,
  setUserSeen,
  user_seens,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading] = useState(false);
  const [date, setDate] = useState<any>([]);
  const [data, setData] = useState({
    counter: 0,
    parsed: [],
  });
  const { id } = getUserData();

  const [query, setQuery] = useState("");

  const column: ColumnsType<any> = [
    {
      title: "Date",
      dataIndex: "date",
      render: (value: any) => moment(value).format("DD/MM/YYYY"),
      width: "15%",
      sortDirections: ["ascend", "descend"],
      defaultSortOrder: "descend",
      sorter: (a, b) => (moment(a.date).isBefore(moment(b.date), "D") ? -1 : 1),
    },
    {
      title: "Description",
      render: (value, record) => record.description,
      width: "40%",
    },
    {
      title: "User",
      render: (value, record) => record.full_name,
      width: "15%",
      filters: [...new Set(data.parsed.map((e: any) => e?.full_name))].map(
        (e: any) => ({
          text: e,
          value: e,
        })
      ),
      onFilter: (value, record) => record.full_name === value,
    },
    {
      title: "Status",
      render: (value, record) =>
        record.status ? (
          <Tag color="green">Seen</Tag>
        ) : (
          <Tag color="cyan">Not Seen</Tag>
        ),
    },
  ];

  useEffect(() => {
    const data: any = parseData(
      log.payload,
      user_seens.payload.find((e) => e.type === "log")?.time,
      date
    );
    setData(data);
  }, [log, user_seens, date]);

  const handleOk = () => {
    setUserSeen({ parent_id: 0, type: "log" });

    setIsModalVisible(false);
  };

  useEffect(() => {
    fetchLog();
  }, [fetchLog, id]);

  const filteredData = data.parsed.filter((e: any) =>
    query !== ""
      ? e.full_name.toLowerCase().includes(query.toLowerCase())
      : true
  );

  return (
    <>
      <Badge
        status="error"
        count={data.counter}
        className="d-flex notification-badge mr-3"
      >
        <Button
          style={{ marginTop: "4px" }}
          type="link"
          icon={<BellOutlined />}
          onClick={() => setIsModalVisible(true)}
        ></Button>
      </Badge>

      <Modal
        style={{ top: 10 }}
        width={1000}
        title="Log"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleOk}
        footer={[]}
        className="fixed-modal"
        centered
      >
        <div className="row">
          <div className="col-md-6">
            <Form.Item label="Filter">
              <DatePicker.RangePicker onChange={(e) => setDate(e)} />
            </Form.Item>
          </div>

          <div className="col-md-4">
            <Form.Item label="User">
              <Input.Search
                placeholder="search"
                onChange={(e) => (e ? setQuery(e.target.value) : setQuery(""))}
                value={query}
              />
            </Form.Item>
          </div>

          <div className="col-md-12">
            <Table
              columns={column}
              loading={log.isPending}
              dataSource={filteredData}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};
/**
 * Map State to Props
 *
 * @param state
 */
const mapStateToProps = (state: any) => ({
  log: state.log.fetchAll,
  user: state.user.fetchOne,
  user_seens: state.user_seen.fetchAll,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchLog: (action: any) => dispatch(fetchAllLog(action)),
  setUserSeen: (action: any) => dispatch(setUserSeen(action)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LogComponent);
