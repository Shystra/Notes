import { Header } from '../../components/Header';
import { List } from '../../components/List';
import styles from './Home.module.css';
import { useState, ChangeEvent, useEffect } from 'react';
import { v4 as uuid } from 'uuid';

export interface ITodo {
  id: string;
  description: string;
  completed: boolean;
}

export function Home() {
  const [todo, setTodo] = useState<string>('');
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [totalInProgress, setTotalInProgress] = useState(0);
  const [totalComplete, setTotalComplete] = useState(0);

  useEffect(() => {
    const newTotalInProgress = todos.reduce(
      (previusValue, current) => (!current.completed ? previusValue + 1 : previusValue),
      0,
    );

    const newTotalCompleted = todos.reduce(
      (previusValue, current) => (current.completed ? previusValue + 1 : previusValue),
      0,
    );

    setTotalInProgress(newTotalInProgress);
    setTotalComplete(newTotalCompleted);
  }, [todos]);

  const addTodo = () => {
    const newTodo: ITodo = {
      id: uuid(),
      description: todo,
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setTodo('');
  };

  const deleteTodo = (id: string) => {
    const filterTodos = todos.filter((todo) => todo.id !== id);
    setTodos(filterTodos);
  };

  const completeTodo = (id: string) => {
    const newTodosState = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(newTodosState);
  };

  const editTodo = (event: ChangeEvent<HTMLInputElement>, id: string) => {
    const newTodosState = todos.map((todo) =>
      todo.id === id
        ? {
            ...todo,
            description: event.target.value,
          }
        : todo
    );
    setTodos(newTodosState);
  };

  // Filtrando as tarefas concluídas e as tarefas não concluídas
  const pendingTodos = todos.filter((todo) => !todo.completed);
  const completedTodos = todos.filter((todo) => todo.completed);

  return (
    <div>
      <Header />
      <div className={styles.createTask}>
        <input type="text" value={todo} onChange={(e) => setTodo(e.target.value)} />
        <button onClick={addTodo}>Adicionar</button>
      </div>

      <div className={styles.filter}>
        <span className={styles.finish}>Finalizados: {totalComplete} tarefas</span>
        <span className={styles.progress}>Em progresso: {totalInProgress} tarefas</span>
      </div>

      {/* Renderizando primeiro as tarefas pendentes e depois as concluídas */}
      <List
        todos={[...pendingTodos, ...completedTodos]}
        deleteTodo={deleteTodo}
        completeTodo={completeTodo}
        editTodo={editTodo}
      />
    </div>
  );
}
