import React from "react"; // 即时没有使用React但是一定要引入,因为babel会把jsx编译成需要使用React的代码
import { User } from "./search-pannel";
import { Table, TableProps } from "antd";
import dayjs from "dayjs";
export interface Project {
  id: string;
  name: string;
  personId: string;
  pin: boolean;
  organization: string;
  created: number;
}

interface ListProps extends TableProps<any> {
  users: User[];
}

// ListProps去掉users就等于TableProps,res为TableProps类型。所以解开对象为Table的属性不会报错
export const List = ({ users, ...props }: ListProps) => {
  return (
    <Table
      rowKey="id"
      pagination={false}
      columns={[
        {
          title: "名称",
          dataIndex: "name",
          sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
          title: "部门",
          dataIndex: "organization",
        },
        {
          title: "负责人",
          render(value, project) {
            return <span>{users.find((user) => user.id === project.personId)?.name || "未知"}</span>;
          },
        },
        {
          title: "创建时间",
          render(value, project) {
            return <span>{project.created ? dayjs(project.created).format("YYYY-MM-DD") : "无"}</span>;
          },
        },
      ]}
      {...props}
    ></Table>
  );
};
