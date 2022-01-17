import styled from "@emotion/styled/macro";
import { useAuth } from "context/auth-context";
import { ReactComponent as SoftwareLogo } from "assets/software-logo.svg";
import React from "react";
import { ProjectListScreen } from "screens/project-list";
import { ProjectScreen } from "screens/project";
import { Row } from "./components/lib";
import { Dropdown, Menu, Button } from "antd";
import { Route, Routes } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import { ProjectModal } from "screens/project-list/project-modal";
import { resetRoute } from "utils";
import { ProjectPopover } from "components/project.popover";
import { ButtonNoPadding } from "components/lib";
import { UserPopover } from "components/user-popover";
/**
 * grid和flex各自的应用场景
 * 1.要考虑，是一维布局 还是 二维部剧
 * 一般来说，一维布局用flex, 二维布局用grid
 * 2.是从内容触发还是从布局出发?
 * 从内容出发: 你先有一组内容（数量一般不固定），然后希望他们均匀的分布在容器中
 * 从布局出发: 先规划网格（数量一般比较固定），然后再把元素往里填充
 * 从内容出发，用flex
 * 从布局出发，用grid
 */
export default function AuthenticatedApp() {
  return (
    <Router>
      <Container>
        <PageHeader />
        <Main>
          <Routes>
            <Route path={"/"} element={<ProjectListScreen />} />
            <Route path={"/projects/:projectId/*"} element={<ProjectScreen />} />
          </Routes>
          {/* 默认路由 */}
          {/* <Navigate to={"/projects"} /> */}
          <ProjectModal />
        </Main>
      </Container>
    </Router>
  );
}
const PageHeader = () => {
  const { logout, user } = useAuth();
  return (
    <Header>
      <HeaderLeft gap={true} between={true}>
        <ButtonNoPadding style={{ padding: 0 }} type="link" onClick={resetRoute}>
          <SoftwareLogo width="18rem" color={"rgb(38,132,255)"} />
        </ButtonNoPadding>
        <ProjectPopover />
        <UserPopover />
      </HeaderLeft>
      <HeaderRight>
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="logout">
                <Button type={"link"} onClick={logout}>
                  登出
                </Button>
              </Menu.Item>
            </Menu>
          }
        >
          <Button type={"link"} onClick={(e) => e.preventDefault()}>
            Hi,{user?.name}
          </Button>
        </Dropdown>
      </HeaderRight>
    </Header>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`;

// grid-area 用来给grid子元素起名字
const Header = styled(Row)`
  grid-area: "header";
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;
const HeaderLeft = styled(Row)`
  padding: 3.2rem;
`;
const HeaderRight = styled.div``;
const Main = styled.main`
  display: flex;
  overflow: hidden;
  width: 100%;
`;
