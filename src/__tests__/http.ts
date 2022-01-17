// msw模拟异步请求 mock数据控制请求的结果
// 理论上单元测试jest不应该去服务器真的请求数据,所以用msw用来单元测试的mock
import { rest } from "msw";
import { setupServer } from "msw/node";
import { http } from "utils/http";

const apiUrl = process.env.REACT_APP_API_URL;

const server = setupServer();

// jest是对react最友好的一个测试库
// beforeAll 代表执行所有的测试之前，先来执行一下回调函数
beforeAll(() => server.listen());

// 每一个测试跑完以后，都重置mock路由
afterEach(() => server.resetHandlers());

// 所有的测试跑完后，关闭mock路由
afterAll(() => server.close());

test("http方法发送异步请求", async () => {
  const endpoint = "test-endpoint"; // 要请求的地址
  const mockResult = { mockValue: "mock" }; // 请求返回的值

  // 监听接口，修改ctx的数据后resp发送回客户端
  server.use(rest.get(`${apiUrl}/${endpoint}`, (req, res, ctx) => res(ctx.json(mockResult))));

  const result = await http(endpoint);
  // 内容一致toEqual 严格相等toBe
  expect(result).toEqual(mockResult);
});

test("http请求时会在header里带上token", async () => {
  const token = "FAKE_TOKEN";
  const endpoint = "test-endpoint"; // 要请求的地址
  const mockResult = { mockValue: "mock" }; // 请求返回的值

  let requets: any;

  server.use(
    rest.get(`${apiUrl}/${endpoint}`, async (req, res, ctx) => {
      console.log("requets:", req);

      requets = req;
      return res(ctx.json(mockResult));
    })
  );

  await http(endpoint, { token });
  expect(requets.headers.get("Authorization")).toBe(`Bearer ${token}`);
});
