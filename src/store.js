import { configureStore } from "@reduxjs/toolkit";

import rootReducer from "./reducers/rootReducer";

const store = configureStore({
  reducer: rootReducer,
  preloadedState: {
    loading: false,
    error: null,
    activityList: [],
    detailPanel: null,
  },
});

export default store;
