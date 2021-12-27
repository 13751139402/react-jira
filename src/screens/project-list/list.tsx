import React from "react"; // 即时没有使用React但是一定要引入,因为babel会把jsx编译成需要使用React的代码
import { User } from "./search-pannel";
import { Table, TableProps, Dropdown, Menu } from "antd";
import dayjs from "dayjs";
import { Pin } from "components/pin";
// react-router 和 react-router-dom的关系，类似于react和react-dom/react-native/react-vr...
// react是核心库，主要处理虚拟的，计算的，理论的逻辑。类似于组件中的状态,useEffect的状态,新旧vnode树计算
// react-dom生活在浏览器环境里，里面充满了dom操作，只能在浏览器中消费react计算的结果
// react-native生活在ios/安卓环境消费react运算的结果
// react-vr生活在vr环境消费react运算的结果
// ================================================================================
// react-router主要管理计算逻辑结果,计算结果丢给react-router-dom来消费，也可以用react-router-native在ios/安卓环境消费
// Link要创建a标签，处理a标签的点击时间，和宿主环境（浏览器）强关联。所以要从dom库中引用
import { Link } from "react-router-dom";
import { useEditProject } from "utils/project";
import { ButtonNoPadding } from "components/lib";
export interface Project {
  id: number;
  name: string;
  personId: number;
  pin: boolean;
  organization: string;
  created: number;
}

interface ListProps extends TableProps<any> {
  users: User[];
  refresh?: () => void;
  setProjectModalOpen: (isOpen: boolean) => void;
}

// ListProps去掉users就等于TableProps,res为TableProps类型。所以解开对象为Table的属性不会报错
export const List = ({ users, ...props }: ListProps) => {
  // hook只能放在函数组件顶部，返回值作为事件函数
  const { mutate } = useEditProject();
  const pinProject = (id: number) => (pin: boolean) => mutate({ id: id, pin: pin }).then(props.refresh);
  return (
    <Table
      rowKey="id"
      pagination={false}
      columns={[
        {
          title: <Pin checked={true} disabled={true} />,
          render(value, project) {
            return <Pin checked={project.pin} onCheckedChange={pinProject(project.id)} />;
          },
        },
        {
          title: "名称",
          sorter: (a, b) => a.name.localeCompare(b.name),
          render(value, project) {
            return <Link to={String(project.id)}>{project.name}</Link>;
          },
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
        {
          render(value, project) {
            return (
              <Dropdown
                overlay={
                  <Menu>
                    <Menu.Item key="edit">
                      <ButtonNoPadding type="link" onClick={() => props.setProjectModalOpen(true)}>
                        编辑
                      </ButtonNoPadding>
                    </Menu.Item>
                  </Menu>
                }
              >
                <ButtonNoPadding type="link">编辑</ButtonNoPadding>
              </Dropdown>
            );
          },
        },
      ]}
      {...props}
    ></Table>
  );
};
