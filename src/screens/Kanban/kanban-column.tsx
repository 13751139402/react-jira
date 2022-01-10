import React from "react";
import { Kanban } from "types/kanban";
import { useTasks } from "utils/task";
import { useTasksSearchParams } from "./util";
export const KanbanColumn = ({ kanban }: { kanban: Kanban }) => {
  // 三个column只请求了一次http,因为react-query的缓存功能，通过http name和params判定
  const { data: allTasks } = useTasks(useTasksSearchParams());
  const tasks = allTasks?.filter((task) => task.kanbanId === kanban.id);
  return (
    <div>
      <h3>{kanban.name}</h3>
      {tasks?.map((task) => (
        <div key={task.id}>{task.name}</div>
      ))}
    </div>
  );
};
