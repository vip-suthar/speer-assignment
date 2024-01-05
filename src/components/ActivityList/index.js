import React from "react";
import { connect } from "react-redux";
import { Button, Flex, List, Skeleton, Tag, Tooltip, Typography } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";

import { listItemAvatarStyle, listItemTextStyle, listStyle } from "./style";
import {
  ArchiveDownOutlined,
  ArchiveUpOutlined,
  PhoneCrossOutlined,
  PhoneInboundOutlined,
  PhoneOutboundOutlined,
  VoicemailOutlined,
} from "../../components/commons/Icons";
import {
  setActivityArchived,
  setDetailPanel,
} from "../../reducers/rootReducer";
import {
  convertSecondsToHMS,
  formatTimeOutput,
} from "../../utils/utilFunctions";

const { Text } = Typography;

function ListItem({ loading, data, setArchived, setDetailPanel }) {
  return (
    <List.Item
      actions={[
        <Text>{formatTimeOutput(data.created_at)}</Text>,
        <Tooltip
          placement="top"
          title={`Move to ${data.is_archived ? "Activity" : "Archive"}`}
        >
          <Button
            key="archive"
            icon={
              data.is_archived ? <ArchiveUpOutlined /> : <ArchiveDownOutlined />
            }
            onClick={() =>
              setArchived({
                id: data.id,
                archived: !data.is_archived,
              })
            }
          />
        </Tooltip>,
        <Tooltip placement="top" title="Details">
          <Button
            key="info"
            icon={<InfoCircleOutlined />}
            onClick={() => setDetailPanel({ open: true, id: data.id })}
          />
        </Tooltip>,
      ]}
    >
      <Skeleton avatar title={true} loading={loading} active>
        <List.Item.Meta
          avatar={
            <span style={listItemAvatarStyle()}>
              {data.call_type === "missed" ? (
                <PhoneCrossOutlined />
              ) : data.call_type === "voicemail" ? (
                <VoicemailOutlined />
              ) : data.call_type === "answered" ? (
                data.direction === "inbound" ? (
                  <PhoneInboundOutlined />
                ) : (
                  <PhoneOutboundOutlined />
                )
              ) : (
                "?"
              )}
            </span>
          }
          title={
            <Flex>
              <div style={listItemTextStyle()}>
                {typeof data.to !== "undefined" ? data.to : "Unknown"}
              </div>

              <Tag>{convertSecondsToHMS(data.duration || 0)}</Tag>
            </Flex>
          }
          description={
            <div style={listItemTextStyle()}>
              {data.from || "Unknown"}
              {data.via ? `(via ${data.via})` : ""}
            </div>
          }
        />
      </Skeleton>
    </List.Item>
  );
}

function ActivityList({ loading, list, setDetailPanel, setActivityArchived }) {
  return (
    <List
      loading={loading}
      itemLayout="horizontal"
      dataSource={list}
      style={listStyle()}
      renderItem={(item) => (
        <ListItem
          loading={loading}
          data={item}
          setArchived={setActivityArchived}
          setDetailPanel={setDetailPanel}
        />
      )}
    />
  );
}

function mapStateToProps(state, props) {
  return {
    loading: state.loading,
    list: props.list,
  };
}

export default connect(mapStateToProps, {
  setActivityArchived,
  setDetailPanel,
})(ActivityList);
