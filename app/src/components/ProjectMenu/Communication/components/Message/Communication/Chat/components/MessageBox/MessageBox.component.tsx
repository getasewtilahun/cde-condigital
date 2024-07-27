import { ReloadOutlined } from "@ant-design/icons";
import { Button, Skeleton } from "antd";
import { FC, useEffect } from "react";
import { connect } from "react-redux";
import { CommunicationMessage } from "../../../../../../../../../redux/CommunicationMessage/CommunicationMessage.type";
import { ApiCallState } from "../../../../../../../../../redux/Utils";
import MessageComponent from "../Message/Message.component";

const MessageBoxComponent: FC<{
  communication_messages: ApiCallState<CommunicationMessage[]>;
  messages: CommunicationMessage[];
  fetchData: Function;
}> = ({ communication_messages, messages, fetchData }) => {
  useEffect(() => { }, []);

  return (
    <div
      className="border-bottom"
      style={{
        height: 512,
        display: "flex",
        flexDirection: "column-reverse",
        overflowY: "scroll",
      }}
    >
      {messages?.map((e: any) => (
        <MessageComponent message={e} key={e.id} />
      ))}

      {communication_messages?.isPending && (
        <div
          className="p-4"
          style={{
            margin: 5,
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Skeleton avatar paragraph={{ rows: 2 }} />
        </div>
      )}

      {!communication_messages?.isPending && (
        <div className="d-flex justify-content-center m-4">
          <Button
            type="text"
            className="text-grey"
            // icon={messages.length > 0 && <ReloadOutlined />}
            onClick={() => fetchData()}
          >
            {messages.length === 0
              ? "No Messages"
              : "Load previous conversations"}
          </Button>
        </div>
      )}
    </div>
  );
};

/**
 * Map State to Props
 *
 * @param state
 */
const mapStateToProps = (state: any) => ({
  communication_messages: state.communication_message.fetchPaged,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageBoxComponent);
