import {
  FileSearchOutlined,
  LoadingOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Input, Modal, Result, Skeleton, Tooltip } from "antd";
import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  searchCommunicationMessage,
  searchCommunicationMessageReset,
} from "../../../../../../../redux/CommunicationMessage/CommunicationMessage.action";
import { CommunicationMessage } from "../../../../../../../redux/CommunicationMessage/CommunicationMessage.type";
import ResultBoxComponent from "./components/ResultBox.component";
import { SearchPropType } from "./Search.util";

const SearchComponent: FC<SearchPropType> = ({
  searchCommunicationMessage,
  searchCommunicationMessageReset,
  searched_messages,
  selected_communication_group,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [search, setSearch] = useState("");
  const [on_wait, setOnWait] = useState(false);

  const [page, setPage] = useState(1);
  const [loaded_messages, setLoadedMessages] = useState<CommunicationMessage[]>(
    []
  );

  useEffect(() => {
    if (!isModalVisible) {
      setSearch("");
      setPage(1);
      setLoadedMessages([]);
      searchCommunicationMessageReset();
    }
  }, [isModalVisible]);

  useEffect(() => {
    if (search && search !== "" && !searched_messages.isPending) {
      setPage(1);

      searchCommunicationMessage({
        communication_group_id: selected_communication_group.id,
        search,
        offset: page,
      });
    }
  }, [search]);

  useEffect(() => {
    if (!searched_messages.isPending && searched_messages.isSuccessful) {
      setLoadedMessages(searched_messages.payload.rows);
    }
  }, [searched_messages]);

  const onPageSelect = (_page: number) => {
    setPage(_page);

    searchCommunicationMessage({
      communication_group_id: selected_communication_group.id,
      search,
      offset: Number(_page),
    });
  };

  return (
    <>
      <Tooltip title={"Click to search texts and files"} placement="leftTop">
        <Button
          icon={<FileSearchOutlined />}
          className="btn-outline-secondary"
          onClick={() => setIsModalVisible(true)}
        />
      </Tooltip>

      <Modal
        width={1000}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[<></>]}
        className="fixed-modal"
      >
        <>
          {/* Search box */}
          <div className="row mt-4 mb-5">
            <div className="col-md-12">
              <Input
                value={search}
                placeholder="Search...."
                addonAfter={
                  searched_messages.isPending ? (
                    <LoadingOutlined style={{ fontSize: 20 }} />
                  ) : (
                    <SearchOutlined style={{ fontSize: 20 }} />
                  )
                }
                size="large"
                onChange={(e: any) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Result Display */}
          {search === "" ? (
            <Result
              icon={
                <FileSearchOutlined
                  style={{
                    color: "#2B5163",
                  }}
                />
              }
              title={`Search in group '${selected_communication_group.name}'`}
              style={{ color: "#2B5163" }}
              subTitle="Messages that match inputted value will appear here."
            />
          ) : (
            <ResultBoxComponent
              loadedMessagesAction={[loaded_messages, setLoadedMessages]}
              pageAction={[page, setPage]}
              onPageSelect={onPageSelect}
            />
          )}
        </>
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
  searched_messages: state.communication_message.search,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  searchCommunicationMessage: (payload: any) =>
    dispatch(searchCommunicationMessage(payload)),
  searchCommunicationMessageReset: () =>
    dispatch(searchCommunicationMessageReset()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchComponent);
