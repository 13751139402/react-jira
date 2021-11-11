import React from "react"; // 即时没有使用React但是一定要引入,因为babel会把jsx编译成需要使用React的代码
import { User } from "./search-pannel";
export interface Project {
  id: string;
  name: string;
  personId: string;
  pin: boolean;
  organization: string;
}

interface ListProps {
  list: Project[];
  users: User[];
}

export const List = ({ list, users }: ListProps) => {
  return (
    <table>
      <thead>
        <tr>
          <th>名称</th>
          <th>负责人</th>
        </tr>
      </thead>
      <tbody>
        {list.map((project) => (
          <tr key={project.id}>
            <td>{project.name}</td>
            <td>{users.find((user) => user.id === project.personId)?.name || "未知"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
