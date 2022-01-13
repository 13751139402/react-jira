// 封装react-beautiful-dnd
import React, { ReactNode } from "react";
import {
  Draggable,
  DraggableProps,
  Droppable,
  DroppableProps,
  DroppableProvided,
  DroppableProvidedProps,
} from "react-beautiful-dnd";

// Droppable的children类型为一个函数，Drop改为传入一个ReactNode
type DropProps = Omit<DroppableProps, "children"> & { children: ReactNode };

// 放下
export const Drop = ({ children, ...props }: DropProps) => {
  // Droppable:可以放下的区域
  return (
    // children为函数时候，组件能给children传参
    <Droppable {...props}>
      {(provided) => {
        // 如果children为Element则克隆一份进行props赋值
        if (React.isValidElement(children)) {
          // Droppable要求子元素得带上provided.innerRef和rovided.droppableProps
          return React.cloneElement(children, {
            ...provided.droppableProps,
            ref: provided.innerRef,
            provided,
          });
        }
        return <div />;
      }}
    </Droppable>
  );
};

type DropChildProps = Partial<{ provided: DroppableProvided } & DroppableProvidedProps> &
  React.HTMLAttributes<HTMLDivElement>;
// React.forwardRef 会创建一个React组件，这个组件能够将其接受的 ref 属性转发到其组件树下的另一个组件中
// Refs 提供了一种方式，允许我们访问 DOM 节点或在 render 方法中创建的 React 元素
export const DropChild = React.forwardRef<HTMLDivElement, DropChildProps>(({ children, ...props }, ref) => {
  return (
    <div ref={ref} {...props}>
      {children}
      {props.provided?.placeholder}
    </div>
  );
});

type DragProps = Omit<DraggableProps, "children"> & { children: ReactNode };
// 拖拽
export const Drag = ({ children, ...props }: DragProps) => {
  return (
    <Draggable {...props}>
      {(provided) => {
        // Draggable要求provided.draggableProps,provided.dragHandleProps,ref为子组件的props
        if (React.isValidElement(children)) {
          return React.cloneElement(children, {
            ...provided.draggableProps,
            ...provided.dragHandleProps,
            ref: provided.innerRef,
          });
        }
        return <div />;
      }}
    </Draggable>
  );
};
