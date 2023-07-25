import { Header } from '../../components/Header';
import { List } from '../../components/List';
import styles from './Home.module.css';
import {useState} from 'react';
import { v4 as uuid}  from 'uuid';

export interface ITodo{
    id: string,
    description: string,
    completed: boolean;
}

export function Home (){
    const [todo, setTodo] = useState<string>('');
    const [todos, setTodos] = useState<ITodo[]>([]);
    

    
    const addTodo = () => {
        const newTodo = {
            id: uuid(),
            description: todo,
            completed: false
        };
        setTodos([...todos, newTodo]);
        setTodo('');
        // console.log('testing', newTodo)
    }
    // console.log('todos',todos)

    const deleteTodo = (id) => {
        const filterTodos = todos.filter(todo => todo.id != id)

        setTodos(filterTodos);
    }

    return(
        <div>
            <Header/>
            <div className={styles.createTask}>
                <input 
                type='text' value={todo} 
                onChange={(e) => setTodo(e.target.value)}/>
                <button onClick={addTodo}>Adicionar</button>
            </div>
            <div className={styles.filter}>
                <span className={styles.finish}>Finalizados: 5 tarefas</span>
                <span className={styles.progress}>Em progresso: 5 tarefas</span>
            </div>

            <List todos={todos} deleteTodo={deleteTodo}/>

            

        </div>
    )
}