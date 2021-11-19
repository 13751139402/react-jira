import { SearchPannel } from "./search-pannel";
import { List } from "./list";
import { useEffect, useState } from "react";
import { cleanObject, useMount, useDebounce } from "utils";
import { useHttp } from "utils/http";
export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    // hook写法
    name: "",
    personId: "",
  });
  const [list, setList] = useState([]);
  const [users, setUsers] = useState([]);
  const debounceParam = useDebounce(param, 1000);
  const client = useHttp();

  useEffect(() => {
    client("projects", { data: cleanObject(debounceParam) }).then(setList);
  }, [debounceParam, client]); // 第二个参数,只有当列表内的value发生变化时才触发第一个参数

  useMount(() => {
    client("users").then(setUsers);
  }); // []表示useEffect只执行一次
  return (
    <div>
      <SearchPannel param={param} setParam={setParam} users={users} />
      <List list={list} users={users} />
    </div>
  );
};
