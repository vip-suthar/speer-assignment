import React from "react";
import { connect } from "react-redux";
import { CloseOutlined } from "@ant-design/icons";
import { Button, Drawer, Flex, Space, Tag, Typography } from "antd";
import dayjs from "dayjs";

import {
  PhoneCrossOutlined,
  PhoneInboundOutlined,
  PhoneOutboundOutlined,
  VoicemailOutlined,
} from "../commons/Icons";
import { convertSecondsToHMS } from "../../utils/utilFunctions";
import { setDetailPanel } from "../../reducers/rootReducer";
import { detailPanelAvatarStyle, detailPanelCloseButtonStyle } from "./style";

const { Title, Text } = Typography;

function DetailPanel({ open, setOpen, data }) {
  return (
    <Drawer
      placement="right"
      open={open}
      width={250}
      onClose={() => setOpen({ open: false })}
      closeIcon={false}
    >
      <Button
        icon={<CloseOutlined />}
        onClick={() => setOpen({ open: false })}
        style={detailPanelCloseButtonStyle()}
      />
      <Title level={3} style={{ marginTop: 0, marginBottom: 0 }}>
        Call Details
      </Title>

      <Flex vertical style={{ marginTop: "25px" }} align="center">
        <span style={detailPanelAvatarStyle()}>
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
        <Space align="center" direction="vertical" size={2}>
          <Text type="secondary" style={{ fontSize: "12px" }}>
            {data.call_type === "missed"
              ? "Missed"
              : data.call_type === "voicemail"
              ? "Voicemail"
              : data.call_type === "answered"
              ? data.direction === "inbound"
                ? "Incoming"
                : "Outgoing"
              : "Invalid Call"}
          </Text>
          <Text>
            {dayjs(data.created_at || 0).format("DD-MM-YYYY hh:mm A")}
          </Text>
        </Space>
        {data.is_archived ? (
          <Tag style={{ marginTop: "8px" }}>Archieved</Tag>
        ) : null}
      </Flex>
      <Flex vertical style={{ marginTop: "15px" }} gap={10}>
        <Space direction="vertical" size={1}>
          <Text type="secondary">From</Text>
          <Text>{data.from || "Unknown"}</Text>
        </Space>
        <Space direction="vertical" size={1}>
          <Text type="secondary">To</Text>
          <Text>{data.to || "Unknown"}</Text>
        </Space>
        <Space direction="vertical" size={1}>
          <Text type="secondary">Via</Text>
          <Text>{data.via || "Unknown"}</Text>
        </Space>
        <Space direction="vertical" size={1}>
          <Text type="secondary">Duration</Text>
          <Text>{convertSecondsToHMS(data.duration || 0)}</Text>
        </Space>
      </Flex>
    </Drawer>
  );
}

function mapStateToProps(state) {
  return {
    open: !!state.detailPanel,
    data: state.detailPanel || {},
  };
}

export default connect(mapStateToProps, {
  setOpen: setDetailPanel,
})(DetailPanel);
