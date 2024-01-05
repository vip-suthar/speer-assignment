import React from "react";
import { connect } from "react-redux";
import { Button, Flex, Grid, Typography } from "antd";

import { ArchiveDownOutlined } from "../components/commons/Icons";

import { activityContainerStyle, activityListContainerStyle } from "../styles/activity";
import ActivityList from "../components/ActivityList";
import { setAllArchived } from "../reducers/rootReducer";

const { Title } = Typography;
const { useBreakpoint } = Grid;

function Activity({ list, setArchived }) {
  const screens = useBreakpoint();

  return (
    <Flex style={activityContainerStyle({ screens })} vertical>
      <Flex align="center" justify="space-between">
        <Title level={3}>Activity</Title>
        <Button icon={<ArchiveDownOutlined />} onClick={() => setArchived()}>
          Archive All
        </Button>
      </Flex>
      <Flex justify="space-between" style={activityListContainerStyle()}>
        <ActivityList list={list} />
      </Flex>
    </Flex>
  );
}

function mapStateToProps(state) {
  return {
    list: state.activityList.filter((item) => !item.is_archived),
  };
}

export default connect(mapStateToProps, { setArchived: setAllArchived })(
  Activity
);
