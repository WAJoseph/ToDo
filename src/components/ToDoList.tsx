import React from "react";
import ToDoItem from "./ToDoItem";

interface Props {
  todos: frappe.Document[];
  onDelete: () => void;
}

const ToDoList: React.FC<Props> = ({ todos, onDelete }) => {
  return (
    <div>
      {todos.map((todo) => (
        <ToDoItem key={todo.name} todo={todo} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default ToDoList;
