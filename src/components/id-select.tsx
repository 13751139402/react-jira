import React from "react";
import { Raw } from "types";
import { Select } from "antd";

type SelectProps = React.ComponentProps<typeof Select>; // 可以将Select的类型全部扒下来

// IdSelectProps有options，SelectProps也有options，ts会尝试在两个options找最大公约数，没有糅合在一起就报错了
// 直接用Omit去除掉SelectProps相同的属性,防止冲突
interface IdSelectProps extends Omit<SelectProps, "value" | "onChange" | "options"> {
  value: Raw | null | undefined;
  onChange: (value?: number) => void;
  defaultOptionName?: string;
  options?: {
    name: string;
    id: number;
  }[];
}

// 选择id的组件
// value 可以传入多种类型的值
// onChange只会回调number|undefined类型
// 当isNaN(Number(value))为true的时候，代表选择默认类型
// 当选择默认类型的时候，onChange会回调undefined
// @param props
// @constructor
export const IdSelect = (props: IdSelectProps) => {
  const { value, onChange, defaultOptionName, options, ...restProps } = props;
  return (
    <Select value={toNumber(value)} onChange={(value) => onChange(toNumber(value) || undefined)} {...restProps}>
      {defaultOptionName ? <Select.Option value={0}>{defaultOptionName}</Select.Option> : null}
      {options?.map((option) => (
        <Select.Option key={option.id} value={option.id}>
          {option.name}
        </Select.Option>
      ))}
    </Select>
  );
};

const toNumber = (value: unknown) => (isNaN(Number(value)) ? 0 : Number(value));
