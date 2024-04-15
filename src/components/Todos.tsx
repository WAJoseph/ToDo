import React, { useEffect, useState } from "react";
import ToDoList from "./ToDoList";
import TodoDetails from "./TodoDetails";
import { Todo } from "../types/Todo";
import { FrappeProvider } from "frappe-react-sdk";
import { useFrappe } from "../context/FrappeContext";

const Todos: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const frappe = useFrappe();

  const fetchTodos = async () => {
    const { name: userName } = frappe.session.user;
    const { message } = await frappe.call({
      method: "erpnext.controllers.tasks.get_tasks",
      args: {
        user: userName,
        page_length: 9999,
      },
    });
    setTodos(message as Todo[]);
  };

  const createTodo = async (todo: Todo) => {
    const { message } = await frappe.call({
      method: "frappe.client.insert",
      args: {
        doc: todo,
      },
    });
    return message;
  };

  const updateTodo = async (todo: Todo) => {
    const { message } = await frappe.call({
      method: "frappe.client.save",
      args: {
        name: todo.name,
        doc: todo,
      },
    });
    return message;
  };

  const deleteTodo = async (todo: Todo) => {
    const { message } = await frappe.call({
      method: "frappe.client.delete",
      args: {
        name: todo.name,
      },
    });
    return message;
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <FrappeProvider frappe={frappe}>
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold text-center mb-8">Todo App</h1>
        {selectedTodo ? (
          <TodoDetails
            todo={selectedTodo}
            onClose={() => setSelectedTodo(null)}
          />
        ) : (
          <TodoList
            todos={todos}
            onCreate={createTodo}
            onUpdate={updateTodo}
            onDelete={deleteTodo}
            onSelect={setSelectedTodo}
          />
        )}
      </div>
    </FrappeProvider>
  );
};

export default Todos;
