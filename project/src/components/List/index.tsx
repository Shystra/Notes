import styles from './List.module.css';
// import {ReactComponent as Check} from '../../assets/check.svg';
import {BsCheckCircle} from 'react-icons/bs';
import {BiSolidEdit} from 'react-icons/bi';
import {AiOutlineDelete} from 'react-icons/ai';
import { ITodo } from '../../pages/Home';

interface IProps{
    todos: ITodo[];
    deleteTodo: (id:string) => void
}

export function List({todos, deleteTodo}: IProps){
   
    return (
        <>
        {todos.map((todo) =>{
            return (

                <div className={styles.card}>
                    <input type="text" value={todo.description}/>
                    <div className={styles.icon}>
                        <BsCheckCircle/>
                        <BiSolidEdit/>
                        <AiOutlineDelete onClick={() => deleteTodo(todo.id)}/>
                    </div>
                </div>
            );

             })}
        </>
    )
}