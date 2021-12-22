import React from "react";
import { Link } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router";
import { KanbanScreen } from "screens/Kanban";
import { EpicScreen } from "screens/epic";
export const ProjectScreen = () => {
  return (
    <div>
      <h1>ProjectScreen</h1>
      <Link to="kanban">看板</Link>
      <Link to="epic">任务组</Link>
      <Routes>
        {/*projects/:projectId/kanban*/}
        <Route path="/kanban" element={<KanbanScreen />} />
        {/*projects/:projectId/epic*/}
        <Route path="/epic" element={<EpicScreen />} />
      </Routes>
      {/*默认路由：如果上面两个匹配不到,就跳转到看板*/}
      {/* <Navigate to={window.location.pathname + "/kanban"} /> */}
    </div>
  );
};
