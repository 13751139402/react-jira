import { Row, ScreenContainer } from "components/lib";
import React, { useState } from "react";
import { useProjectInUrl } from "screens/Kanban/util";
import { useEpicsQueryKey, useEpicsSearchParams } from "./util";
import { useDeleteEpic, useEpics } from "utils/epic";
import { List, Button } from "antd";
import dayjs from "dayjs";
import { useTasks } from "utils/task";
import { Link } from "react-router-dom";
import { CreateEpic } from "./create-epic";
export const EpicScreen = () => {
  const { data: currentProject } = useProjectInUrl();
  const { data: epics } = useEpics(useEpicsSearchParams());
  const { data: tasks } = useTasks({ projectId: currentProject?.id });
  const { mutate: deleteEpic } = useDeleteEpic(useEpicsQueryKey());
  const [epicCreateOpen, setEpicCreateOpen] = useState(false);
  return (
    <ScreenContainer>
      <Row between={true}>
        <h1>{currentProject?.name}任务组</h1>
        <Button onClick={() => setEpicCreateOpen(true)}>创建任务组</Button>
      </Row>
      <List
        style={{ overflowY: "auto" }}
        dataSource={epics}
        itemLayout="vertical"
        renderItem={(epic) => (
          <List.Item>
            <List.Item.Meta
              title={
                <Row between={true}>
                  <span>{epic.name}</span>
                  <Button onClick={() => deleteEpic({ id: epic.id })} type="link">
                    删除
                  </Button>
                </Row>
              }
              description={
                <div>
                  <div>开始时间:{dayjs(epic.start).format("YYYY-MM-DD")}</div>
                  <div>结束时间:{dayjs(epic.end).format("YYYY-MM-DD")}</div>
                </div>
              }
            />
            <div>
              {tasks
                ?.filter((task) => task.epicId === epic.id)
                .map((task) => (
                  <Link to={`/projects/${currentProject?.id}/kanban?editingTaskId=${task.id}`} key={task.id}>
                    {task.name}
                  </Link>
                ))}
            </div>
          </List.Item>
        )}
      ></List>
      <CreateEpic onClose={() => setEpicCreateOpen(false)} visible={epicCreateOpen}></CreateEpic>
    </ScreenContainer>
  );
};
