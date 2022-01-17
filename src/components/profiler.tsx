import React, { ProfilerOnRenderCallback, ProfilerProps } from "react";

type Props = {
  metadata?: any;
  phases?: ("mount" | "update")[];
} & Omit<ProfilerProps, "onRender">;

// 维护一个队列，渲染可能一秒钟发生几十次，如果全部http上传报告会消耗性能,这里集中起来再发送
let queue: unknown[] = [];

const sendProfileQueue = () => {
  if (!queue.length) {
    return;
  }
  const queueToSend = [...queue];
  queue = [];
  // 简单的打印控制台，这里业务中应该是上传服务器
  console.log(queueToSend);
};

// 每五秒发送一袭
setInterval(sendProfileQueue, 5000);

export const Profiler = ({ metadata, phases, ...props }: Props) => {
  const reportProfile: ProfilerOnRenderCallback = (
    id,
    phase,
    actualDuration,
    baseDuration,
    startTime,
    commitTime,
    interactions
  ) => {
    // phases可以指定想报告的阶段，phase在phases才报告
    if (!phases || phases.includes(phase)) {
      queue.push({
        id,
        phase,
        actualDuration,
        baseDuration,
        startTime,
        commitTime,
        interactions,
        metadata,
      });
    }
  };
  return <React.Profiler onRender={reportProfile} {...props}></React.Profiler>;
};
