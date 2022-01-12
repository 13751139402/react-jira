import styled from "@emotion/styled";
import React from "react";
import { SearchPannel } from "./search-pannel";
import { useDocumentTitle } from "utils";
import { useKanBans } from "utils/kanban";
import { KanbanColumn } from "./kanban-column";
import { useKanbansSearchParams, useProjectInUrl, useTasksSearchParams } from "./util";
import { ScreenContainer } from "components/lib";
import { useTasks } from "utils/task";
import { Spin } from "antd";
import { CreateKanban } from "./create-kanban";
import { TaskModal } from "./task-modal";
import { DragDropContext } from "react-beautiful-dnd";
import { Drag, Drop, DropChild } from "components/drag-and-drop";
export const KanbanScreen = () => {
  useDocumentTitle("看板列表");

  const { data: currentProject } = useProjectInUrl();
  const { data: kanbans, isLoading: kanbanIsLoading } = useKanBans(useKanbansSearchParams());
  const { isLoading: taskIsLoading } = useTasks(useTasksSearchParams());
  const isLoading = taskIsLoading || kanbanIsLoading;
  return (
    <DragDropContext onDragEnd={() => {}}>
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
  );
};

export const ColumnsContainer = styled("div")`
  display: flex;
  overflow-x: auto;
  flex: 1;
`;
