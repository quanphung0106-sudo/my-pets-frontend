import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    message: "",
    type: "",
  },
  reducers: {
    showNotification: (state, action) => {
      state.message = action.payload.message;
      state.type = action.payload.type || "success";
    },
    resetNotification: (state) => {
      state.message = "";
      state.type = "";
    },
  },
});

export const { showNotification, resetNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
