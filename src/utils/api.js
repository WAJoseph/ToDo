const BASE_URL = '/api/resource';

export const getTodos = async (user: string): Promise<ITodo[]> => {
  const response = await fetch(`${BASE_URL}/ToDo?owner=${user}`);
  const data = await response.json();
  return data.map((item: any) => ({
    id: item.name,
    title: item.title,
    description: item.description,
    completed: item.status === 'Completed'
  }));
};

export const createTodo = async (user: string, todo: ITodo): Promise<ITodo> => {
  const response = await fetch(`${BASE_URL}/ToDo`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      owner: user,
      title: todo.title,
      description: todo.description
    })
  });
  const data = await response.json();
  return {
    id: data.name,
    title: data.title,
    description: data.description,
    completed: false
  };
};

export const updateTodo = async (todo: ITodo): Promise<void> => {
  await fetch(`${BASE_URL}/ToDo/${todo.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      status: todo.completed ? 'Completed' : 'Open',
      title: todo.title,
      description: todo.description
    })
  });
};

export const deleteTodo = async (todo: ITodo): Promise<void> => {
  await fetch(`${BASE_URL}/ToDo/${todo.id}`, {
    method: 'DELETE'
  });
};

interface ITodo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}
