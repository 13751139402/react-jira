const CracoLessPlugin = require("craco-less");
const path = require("path");
module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { "@primary-color": "rgb(0,82,204)", "@font-size-base": "16px" },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
  webpack: {
    // 以下代码！！！  与alias或babel同级
    configure: (webpackConfig, { env, paths }) => {
      webpackConfig.output = {
        ...webpackConfig.output,
        path: path.resolve(__dirname, "build"),
        publicPath: "./",
      };
      return webpackConfig;
    },
  },
};
