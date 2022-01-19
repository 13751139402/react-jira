import { setupServer } from "msw/node";
import { rest } from "msw";
import fakeData from "./db.json";
import { render, screen, waitFor } from "@testing-library/react";
import { ProjectListScreen } from "screens/project-list";
import { AppProviders } from "context";
import { ReactNode } from "react";
import userEvent from "@testing-library/user-event";

// jest集成测试是用Node模拟页面的，而不是浏览器，好处是快
const apiUrl = process.env.REACT_APP_API_URL;

// 要Mock的api请求
const server = setupServer(
  rest.get(`${apiUrl}/me`, (req, res, ctx) =>
    res(
      ctx.json({
        id: 1,
        name: "jack",
        token: "123",
      })
    )
  ),
  rest.get(`${apiUrl}/users`, (req, res, ctx) => res(ctx.json(fakeData.users))),
  rest.get(`${apiUrl}/projects`, (req, res, ctx) => {
    const { name = "", personId = undefined } = Object.fromEntries(req.url.searchParams);
    const result = fakeData?.projects?.filter((project) => {
      return project.name.includes(name) && (personId ? project.personId === +personId : true);
    });
    return res(ctx.json(result));
  })
);

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

// 等某件事情发生的时候再继续执行
const waitTable = () => waitFor(() => expect(screen.getByText("骑手管理")).toBeInTheDocument());

// 模拟有多少行project数据
test("项目列表展示正常", async () => {
  renderScreen(<ProjectListScreen />, { route: "/projects" });
  await waitTable(); // 等页面有"骑手管理"四个字再开始判断
  expect(screen.getAllByRole("row").length).toBe(fakeData.projects.length + 1);
});

test("搜索项目", async () => {
  renderScreen(<ProjectListScreen />, { route: "/projects?name=骑手" });
  await waitTable();
  expect(screen.getAllByRole("row").length).toBe(2);
  expect(screen.getByText("骑手管理")).toBeInTheDocument(); // 检查骑手管理文本是否在document中
});

export const renderScreen = (ui: ReactNode, { route = "/projects" } = {}) => {
  window.history.pushState({}, "Test Page", route);
  return render(<AppProviders>{ui}</AppProviders>);
};

// ebzyme airbnb 是 @testing-library/react 的前身， 优点是由用户的视角去测试，而不是开发者的角度
