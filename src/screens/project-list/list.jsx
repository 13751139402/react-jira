import React from "react"; // 即时没有使用React但是一定要引入,因为babel会把jsx编译成需要使用React的代码
export const List = ({ list, users }) => {
  console.log("list参数,users参数", list, users);
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
