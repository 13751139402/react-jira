import styled from "@emotion/styled";
import React from "react";
import { SearchPannel } from "./search-pannel";
import { useDocumentTitle } from "utils";
import { useKanBans } from "utils/kanban";
import { KanbanColumn } from "./kanban-column";
import { useKanbansSearchParams, useProjectInUrl } from "./util";
import { ScreenContainer } from "components/lib";
export const KanbanScreen = () => {
  useDocumentTitle("看板列表");

  const { data: currentProject } = useProjectInUrl();
  const { data: kanbans } = useKanBans(useKanbansSearchParams());
  return (
    <ScreenContainer>
      <h1>{currentProject?.name}看板</h1>
      <SearchPannel></SearchPannel>
      <ColumnsContainer>
        {kanbans?.map((kanban) => (
          <KanbanColumn kanban={kanban} key={kanban.id}></KanbanColumn>
        ))}
      </ColumnsContainer>
    </ScreenContainer>
  );
};

export const ColumnsContainer = styled("div")`
  display: flex;
  overflow-y: auto;
  flex: 1;
`;
