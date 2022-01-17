import styled from "@emotion/styled";
import React, { useCallback } from "react";
import { SearchPannel } from "./search-pannel";
import { useDocumentTitle } from "utils";
import { useKanBans, useReorderKanban } from "utils/kanban";
import { KanbanColumn } from "./kanban-column";
import { Profiler } from "components/profiler";
import {
  useKanbansQueryKey,
  useKanbansSearchParams,
  useProjectInUrl,
  useTasksQueryKey,
  useTasksSearchParams,
} from "./util";
import { ScreenContainer } from "components/lib";
import { useReorderTask, useTasks } from "utils/task";
import { Spin } from "antd";
import { CreateKanban } from "./create-kanban";
import { TaskModal } from "./task-modal";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Drag, Drop, DropChild } from "components/drag-and-drop";
export const KanbanScreen = () => {
  useDocumentTitle("看板列表");

  const { data: currentProject } = useProjectInUrl();
  const { data: kanbans, isLoading: kanbanIsLoading } = useKanBans(useKanbansSearchParams());
  const { isLoading: taskIsLoading } = useTasks(useTasksSearchParams());
  const isLoading = taskIsLoading || kanbanIsLoading;
  return (
    <Profiler id="看板页面">
      <DragDropContext onDragEnd={useDragEnd()}>
        <ScreenContainer>
          <h1>{currentProject?.name}看板</h1>
          <SearchPannel></SearchPannel>
          {isLoading ? (
            <Spin size="large"></Spin>
          ) : (
            <ColumnsContainer>
              <Drop type={"COLUMN"} direction={"horizontal"} droppableId={"kanban"}>
                <DropChild style={{ display: "flex" }}>
                  {kanbans?.map((kanban, index) => (
                    <Drag key={kanban.id} draggableId={"kanban" + kanban.id} index={index}>
                      <KanbanColumn kanban={kanban} key={kanban.id} />
                    </Drag>
                  ))}
                </DropChild>
              </Drop>
              <CreateKanban />
            </ColumnsContainer>
          )}
          <TaskModal></TaskModal>
        </ScreenContainer>
      </DragDropContext>
    </Profiler>
  );
};

export const useDragEnd = () => {
  const { data: kanbans } = useKanBans(useKanbansSearchParams());
  const { mutate: reorderKanban } = useReorderKanban(useKanbansQueryKey());
  const { mutate: reorderTask } = useReorderTask(useTasksQueryKey());

  const { data: allTasks = [] } = useTasks(useTasksSearchParams());
  return useCallback(
    ({ source, destination, type }: DropResult) => {
      if (!destination) {
        return;
      }
      // 看板排序
      if (type === "COLUMN") {
        const fromId = kanbans?.[source.index].id;
        const toId = kanbans?.[destination.index].id;
        if (!fromId || !toId || fromId === toId) {
          return;
        }
        const type = destination.index > source.index ? "after" : "before";
        reorderKanban({ fromId, referenceId: toId, type });
      }
      // Task排序
      if (type === "ROW") {
        const fromKanbanId = +source.droppableId;
        const toKanbanId = +destination.droppableId;
        console.log("fromKanbanId:", fromKanbanId, "toKanbanId:", toKanbanId);

        // if (fromKanbanId === toKanbanId) {
        //   // 不允许同看板排序
        //   return;
        // }
        const fromTask = allTasks?.filter((task) => task.kanbanId === fromKanbanId)[source.index];
        const toTask = allTasks?.filter((task) => task.kanbanId === toKanbanId)[destination.index];
        if (fromTask?.id === toTask?.id) {
          // 移动的位置一样就什么都不做
          return;
        }
        reorderTask({
          fromId: fromTask?.id,
          referenceId: toTask?.id,
          fromKanbanId,
          toKanbanId,
          type: fromKanbanId === toKanbanId && destination.index > source.index ? "after" : "before",
        });
      }
    },
    [allTasks, kanbans, reorderKanban, reorderTask]
  );
};

export const ColumnsContainer = styled("div")`
  display: flex;
  overflow-x: auto;
  flex: 1;
`;
