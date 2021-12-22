import { SearchPannel } from "./search-pannel";
import { List } from "./list";
import { useState } from "react";
import { useDebounce, useDocumentTitle } from "utils";
import { useProject } from "utils/project";
import styled from "@emotion/styled";
import { Typography } from "antd";
import { useUsers } from "utils/user";
export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    // hook写法
    name: "",
    personId: "",
  });
  // 每次页面渲染时会重新触发ProjectListScreen,但是effect只有初次渲染或者params改变才执行
  const debounceParam = useDebounce(param, 1000);
  const { error, data: list } = useProject(debounceParam);
  const { data: users } = useUsers();

  // 渲染函数监听了param，data,error 三者有变化的时候就触发ProjectListScreen渲染页面
  // input改变时会setParam改变param
  // custom-hook就是传state进去，进行逻辑处理，再导出state。形成一个独立的业务，但是通过state又可以与外部响应式

  useDocumentTitle("项目列表", false);

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPannel param={param} setParam={setParam} users={users || []} />
      {error ? <Typography.Text type="danger">{error.message}</Typography.Text> : ""}
      <List dataSource={list || []} users={users || []} />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;
