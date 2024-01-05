import { asyncThunkCreator, buildCreateSlice } from "@reduxjs/toolkit";
import {
  fetchActivitiesAPI,
  setActivityArchivedAPI,
  setAllArchivedAPI,
  setAllUnarchivedAPI,
} from "../utils/apiHandler";

const createSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

const initialState = {
  loading: false,
  error: null,
  activityList: [],
  detailPanel: null,
};

const rootReducerSlice = createSlice({
  name: "root",
  initialState,
  reducers: (create) => ({
    getActivities: create.asyncThunk(fetchActivitiesAPI, {
      pending: (state) => {
        state.loading = true;
      },
      rejected: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
      fulfilled: (state, action) => {
        state.loading = false;
        state.error = null;
        state.activityList = action.payload;
      },
    }),
    setActivityArchived: create.asyncThunk(
      async ({ id, archived }, thunkAPI) => {
        try {
          await setActivityArchivedAPI({ id, archived });
          return thunkAPI.fulfillWithValue({ id, archived });
        } catch (err) {
          return thunkAPI.rejectWithValue(err.message);
        }
      },
      {
        pending: (state) => {
          state.loading = true;
        },
        rejected: (state, action) => {
          state.loading = false;
          state.error = action.payload;
        },
        fulfilled: (state, action) => {
          state.loading = false;
          state.error = null;
          const updateActivity = state.activityList.find(
            (item) => item.id === action.payload.id
          );
          updateActivity.is_archived = action.payload.archived;
        },
      }
    ),
    setAllArchived: create.asyncThunk(
      async (_arg, thunkAPI) => {
        const state = thunkAPI.getState();
        const data = await setAllArchivedAPI(state.activityList);
        return data;
      },
      {
        pending: (state) => {
          state.loading = true;
        },
        rejected: (state, action) => {
          state.loading = false;
          state.error = action.payload;
        },
        fulfilled: (state) => {
          state.loading = false;
          state.error = null;
          state.activityList.forEach((item) => {
            item.is_archived = true;
          });
        },
      }
    ),
    setAllUnarchived: create.asyncThunk(setAllUnarchivedAPI, {
      pending: (state) => {
        state.loading = true;
      },
      rejected: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
      fulfilled: (state) => {
        state.loading = false;
        state.error = null;
        state.activityList.forEach((item) => {
          item.is_archived = false;
        });
      },
    }),
    setDetailPanel: (state, action) => {
      if (!action.payload?.open) state.detailPanel = null;
      else
        state.detailPanel = state.activityList.find(
          (item) => item.id === action.payload?.id
        );
    },
  }),
});

export const {
  getActivities,
  setActivityArchived,
  setAllArchived,
  setAllUnarchived,
  setDetailPanel,
} = rootReducerSlice.actions;

export default rootReducerSlice.reducer;
