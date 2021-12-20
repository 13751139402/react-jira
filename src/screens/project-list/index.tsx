import { SearchPannel } from "./search-pannel";
import { List } from "./list";
import { useEffect, useState } from "react";
import { cleanObject, useMount, useDebounce } from "utils";
import { useHttp } from "utils/http";
import styled from "@emotion/styled";
import { Typography } from "antd";
export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    // hook写法
    name: "",
    personId: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | Error>(null);
  const [list, setList] = useState([]);
  const [users, setUsers] = useState([]);
  const debounceParam = useDebounce(param, 1000);
  const client = useHttp();

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    client("projects", { data: cleanObject(debounceParam) })
      .then(setList)
      .catch((error) => {
        setList([]);
        setError(error);
      })
      .finally(() => setIsLoading(false));
  }, [debounceParam, client]); // 第二个参数,只有当列表内的value发生变化时才触发第一个参数

  useMount(() => {
    client("users").then(setUsers);
  }); // []表示useEffect只执行一次
  return (
    <Container>
      <SearchPannel param={param} setParam={setParam} users={users} />
      {error ? <Typography.Text type="danger">{error.message}</Typography.Text> : ""}
      <List dataSource={list} users={users} />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;
