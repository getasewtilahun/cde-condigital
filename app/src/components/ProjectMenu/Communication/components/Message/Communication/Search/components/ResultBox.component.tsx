import { Divider, Empty, Pagination, Skeleton } from "antd";
import { FC, useEffect } from "react";
import { connect } from "react-redux";
import { CommunicationMessage } from "../../../../../../../../redux/CommunicationMessage/CommunicationMessage.type";
import { ApiCallState, PagedData } from "../../../../../../../../redux/Utils";
import ResultMessageComponent from "./ResultMessage";

const ResultBoxComponent: FC<{
  searched_messages: ApiCallState<PagedData<CommunicationMessage[]>>;
  loadedMessagesAction: any;
  pageAction: any;
  onPageSelect: Function;
}> = ({
  searched_messages,
  loadedMessagesAction,
  pageAction,
  onPageSelect,
}) => {
    const [loaded_messages, setLoadedMessages] = loadedMessagesAction;
    const [page, setPage] = pageAction;

    useEffect(() => { }, []);

    return searched_messages.isPending ? (
      <div
        className="p-4"
        style={{
          margin: 5,
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Skeleton paragraph={{ rows: 2 }} />
        <Skeleton paragraph={{ rows: 2 }} />
        <Skeleton paragraph={{ rows: 2 }} />
      </div>
    ) : loaded_messages.length === 0 ? (
      <Empty description="No data found" />
    ) : (
      <div
        style={{
          height: 430,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {loaded_messages.map((e: any) => (
          <ResultMessageComponent key={e.id} message={e} />
        ))}

        <div className="col mt-3">
          <Pagination
            current={page}
            total={searched_messages.payload.count}
            onChange={(e: any) => onPageSelect(e)}
          />
        </div>

        <Divider />
      </div>
    );
  };

/**
 * Map State to Props
 *
 * @param state
 */
const mapStateToProps = (state: any) => ({
  searched_messages: state.communication_message.search,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ResultBoxComponent);
