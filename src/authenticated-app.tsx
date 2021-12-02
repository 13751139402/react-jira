import styled from "@emotion/styled/macro";
import { useAuth } from "context/auth-context";
import { ReactComponent as SoftwareLogo } from "assets/software-logo.svg";
import React from "react";
import { ProjectListScreen } from "screens/project-list";
import { Row } from "./components/lib";
import { Dropdown, Menu } from "antd";
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
export const AuthenticatedApp = () => {
  const { logout, user } = useAuth();
  return (
    <Container>
      <Header>
        <HeaderLeft gap={true} between={true}>
          <SoftwareLogo width="18rem" color={"rgb(38,132,255)"} />
          <h2>项目</h2>
          <h2>用户</h2>
        </HeaderLeft>
        <HeaderRight>
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key="logout">
                  <a href="/" onClick={logout}>
                    登出
                  </a>
                </Menu.Item>
              </Menu>
            }
          >
            <a href="/" onClick={(e) => e.preventDefault()}>
              Hi,{user?.name}
            </a>
          </Dropdown>
        </HeaderRight>
      </Header>
      <Main>
        <ProjectListScreen></ProjectListScreen>
      </Main>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr 6rem;
  height: 100vh;
`;

const Header = styled.header`
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
  grid-area: "main";
`;
