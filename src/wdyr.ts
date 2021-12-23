import React from "react";

if (process.env.NODE_ENV === "development") {
  const whyDidYouRender = require("@welldone-software/why-did-you-render");
  // const ReactRedux = require("react-redux");
  whyDidYouRender(React, {
    trackAllPureComponents: false, // 是否跟踪所有的函数组件
    // trackExtraHooks: [[ReactRedux, "useSelector"]],
  });
}
