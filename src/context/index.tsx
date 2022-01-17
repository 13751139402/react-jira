import { AuthProvider } from "context/auth-context";
import React, { ReactNode } from "react";
import { QueryClientProvider, QueryClient } from "react-query";

export const AppProviders = ({ children }: { children: ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // react-query在页面从后台进入用户界面时默认重新请求数据刷新页面，这里设置false取消
        refetchOnWindowFocus: false,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>
  );
};
