import React from "react";
import { Drawer, Button } from "antd";
import { useProjectModal } from "./util";
export const ProjectModal = () => {
  const { projectCreate, close } = useProjectModal();
  return (
    <Drawer visible={projectCreate} width="100%" onClose={close}>
      <h1>Project Modal</h1>
      <Button onClick={close}>关闭</Button>
    </Drawer>
  );
};
