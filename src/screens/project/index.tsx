import React from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { Routes, Route, useLocation } from "react-router";
import { KanbanScreen } from "screens/Kanban";
import { EpicScreen } from "screens/epic";
import { ScreenContainer } from "components/lib";
import { Menu } from "antd";

const useRouteType = () => {
  const units = useLocation().pathname.split("/");
  return units[units.length - 1];
};

export const ProjectScreen = () => {
  const routeType = useRouteType();
  return (
    <Container>
      <Aside>
        <Menu mode="inline" selectedKeys={[routeType]}>
          <Menu.Item key="kanban">
            <Link to="kanban">看板</Link>
          </Menu.Item>
          <Menu.Item key="epic">
            <Link to="epic">任务组</Link>
          </Menu.Item>
        </Menu>
      </Aside>
      <ScreenContainer>
        <Main>
          <Routes>
            {/*projects/:projectId/kanban*/}
            <Route path="/kanban" element={<KanbanScreen />} />
            {/*projects/:projectId/epic*/}
            <Route path="/epic" element={<EpicScreen />} />
          </Routes>
          {/*默认路由：如果上面两个匹配不到,就跳转到看板*/}
          {/* <Navigate to={window.location.pathname + "/kanban"} /> */}
        </Main>
      </ScreenContainer>
    </Container>
  );
};

const Aside = styled.aside`
  background-color: rgb(244, 245, 247);
  display: flex;
`;

const Main = styled.div`
  box-shadow: -5px 0 5px -5px rgba(0, 0, 0, 0.1);
  display: flex;
  overflow: hidden;
  height: 100%;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 16rem 1fr;
  width: 100%;
  overflow: hidden;
`;
