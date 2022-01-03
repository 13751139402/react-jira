import React from "react";
import { Drawer, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { projectListActions, selectProjectModalOpen } from "./project-list.slice";
export const ProjectModal = () => {
  // 返回一个函数用于触发slice中的dispatch函数
  const dispatch = useDispatch();
  // useSelector读取根store数据,作为参数丢入selectProjectModalOpen并执行
  const projectModalOpen = useSelector(selectProjectModalOpen);
  return (
    <Drawer visible={projectModalOpen} width="100%" onClose={() => dispatch(projectListActions.closeProjectModal())}>
      <h1>Project Modal</h1>
      <Button onClick={() => dispatch(projectListActions.closeProjectModal())}>关闭</Button>
    </Drawer>
  );
};
