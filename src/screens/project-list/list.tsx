import React from "react"; // 即时没有使用React但是一定要引入,因为babel会把jsx编译成需要使用React的代码
import { User } from "./search-pannel";
import { Table } from "antd";
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
    <Table
      pagination={false}
      columns={[
        {
          title: "名称",
          dataIndex: "name",
          sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
          title: "负责人",
          render(value, project) {
            return <span>{users.find((user) => user.id === project.personId)?.name || "未知"}</span>;
          },
        },
      ]}
      dataSource={list}
    ></Table>
  );
};
