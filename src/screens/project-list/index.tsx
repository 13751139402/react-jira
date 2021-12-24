import { SearchPannel } from "./search-pannel";
import { List } from "./list";
import { useDebounce, useDocumentTitle } from "utils";
import { useProject } from "utils/project";
import styled from "@emotion/styled";
import { Typography, Button } from "antd";
import { useUsers } from "utils/user";
import { useProjectsSearchParams } from "./util";
// 基本类型，可以放到依赖里；组件状态，可以放到依赖里；非组件状态的对象，绝不可以放到依赖里
// https://codesandbox.io/s/keen-wave-tlz9s?file=/src/App.js

export const ProjectListScreen = () => {
  // 每次页面渲染时会重新触发ProjectListScreen,但是effect只有初次渲染或者params改变才执行
  const [param, setParam] = useProjectsSearchParams();
  const { isLoading, error, data: list, retry } = useProject(useDebounce(param, 1000));
  const { data: users } = useUsers();

  // 渲染函数监听了param，data,error 三者有变化的时候就触发ProjectListScreen渲染页面
  // input改变时会setParam改变param
  // custom-hook就是传state进去，进行逻辑处理，再导出state。形成一个独立的业务，但是通过state又可以与外部响应式
  return (
    <Container>
      <h1>项目列表</h1>
      <Button onClick={retry}>retry</Button>
      <SearchPannel param={param} setParam={setParam} users={users || []} />
      {error ? <Typography.Text type="danger">{error.message}</Typography.Text> : ""}
      <List refresh={retry} loading={isLoading} dataSource={list || []} users={users || []} />
    </Container>
  );
};

ProjectListScreen.whyDidYouRender = true;

const Container = styled.div`
  padding: 3.2rem;
`;
