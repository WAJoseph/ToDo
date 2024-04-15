import React from "react";
import frappe from "../../api/frappe";

interface Props {
  todo: frappe.Document;
  onDelete: () => void;
}

const ToDoItem: React.FC<Props> = ({ todo, onDelete }) => {
  const handleDelete = async () => {
    await todo.remove();
    onDelete();
  };

  return (
    <div>
      <h3>{todo.fields.subject}</h3>
      <p>{todo.fields.description}</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default ToDoItem;
