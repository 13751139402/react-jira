import React from "react";
import { render, screen } from "@testing-library/react";
import { Mark } from "components/mark";
// jest是个框架，用来调用test等等
test("Mark 组件正确高亮关键词", () => {
  const name = "物料管理";
  const keyword = "管理";
  // 渲染一个组件
  render(<Mark name={name} keyword={keyword} />);

  // 搜索文本keyword这个元素是否在dom tree中被渲染
  expect(screen.getByText(keyword)).toBeInTheDocument();
  // 证明keyword这个元素的颜色
  expect(screen.getByText(keyword)).toHaveStyle("color:#257AFD");
  // 证明物料这个元素没有高亮
  expect(screen.getByText("物料")).not.toHaveStyle("color:#257AFD");
});
