import { RootState } from "store";
import { createSlice } from "@reduxjs/toolkit";
interface State {
  projectModalOpen: boolean;
}
const initialState: State = {
  projectModalOpen: false,
};
// slice是切片的意思,slice保存着state和reducers
export const projectListSlice = createSlice({
  name: "projectListSlice",
  initialState,
  // toolkit内嵌了immer，可以让state.projectModalOpen = true;也触发渲染，一般情况是返回新对象
  reducers: {
    openProjectModal(state) {
      state.projectModalOpen = true;
    },
    closeProjectModal(state) {
      state.projectModalOpen = false;
    },
  },
});
export const projectListActions = projectListSlice.actions;
export const selectProjectModalOpen = (state: RootState) => state.projectList.projectModalOpen;
