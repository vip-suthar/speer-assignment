import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { connect } from "react-redux";
import { App as AntApp, Flex, Grid } from "antd";

import { getActivities } from "./reducers/rootReducer";
import { rootContainerStyle } from "./styles/app.js";
import Activity from "./pages/Activity";
import Navbar from "./components/Navbar";
import Archive from "./pages/Archive";
import DetailPanel from "./components/DetailPanel";

const { useBreakpoint } = Grid;

function App({ error, getActivitiesData }) {
  const { message } = AntApp.useApp();
  if(!!error) message.error(error);

  useEffect(() => {
    getActivitiesData();
  }, [getActivitiesData]);

  const screens = useBreakpoint();
  return (
    <Flex style={rootContainerStyle()} vertical={screens.xs}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Activity />} />
        <Route path="/archive" element={<Archive />} />
      </Routes>
      <DetailPanel />
    </Flex>
  );
}

function mapStateToProps(state) {
  return {
    error: state.error,
  };
}

export default connect(mapStateToProps, { getActivitiesData: getActivities })(App);
