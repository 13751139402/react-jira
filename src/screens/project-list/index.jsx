import { SearchPannel } from "./search-pannel";
import { List } from "./list";
import { useEffect, useState } from "react";
import { cleanObject } from "utils";
import qs from "qs";
const apiUrl = process.env.REACT_APP_API_URL;
export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    // hook写法
    name: "",
    personId: "",
  });
  const [list, setList] = useState([]);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    // 相当于vue的watch,当[param]发生改变时触发,去发送请求同步表单
    // 初始化时也会执行一次
    console.log("调用useEffect触发");
    fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(param))}`).then(async (response) => {
      if (response.ok) {
        setList(await response.json());
      }
    });
  }, [param]);

  useEffect(() => {
    fetch(`${apiUrl}/users`).then(async (response) => {
      if (response.ok) {
        setUsers(await response.json());
      }
    });
  }, []);
  return (
    <div>
      <SearchPannel param={param} setParam={setParam} users={users} />
      <List list={list} users={users} />
    </div>
  );
};
