import React from "react";

export const Mark = ({ name, keyword }: { name: string; keyword: string }) => {
  if (!keyword) {
    return <>{name}</>;
  }
  const arr = name.split(keyword);
  // split切割之后就会变成,[str,keyword,str,keyword.....],再map映射即可
  return (
    <>
      {arr.map((str: string, index: number) => (
        <span key={index}>
          {str}
          {index === arr.length - 1 ? null : <span style={{ color: "#257AFD" }}>{keyword}</span>}
        </span>
      ))}
    </>
  );
};
