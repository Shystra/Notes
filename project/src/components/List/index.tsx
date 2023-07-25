import styles from './List.module.css';
// import {ReactComponent as Check} from '../../assets/check.svg';
import { BsCheckCircle } from 'react-icons/bs';
import { BiSolidEdit } from 'react-icons/bi';
import { AiOutlineDelete } from 'react-icons/ai';
import { ITodo } from '../../pages/Home';
import { ForwardRefRenderFunction, forwardRef, useMemo, createRef, useImperativeHandle, ChangeEvent } from 'react';

interface IProps {
    todos: ITodo[];
    deleteTodo: (id: string) => void;
    completeTodo: (id: string) => void;
    editTodo: (event: ChangeEvent<HTMLInputElement>, id: string) => void;
}

interface IListRef{
    focus: (index: number) => void;
}


const ListBase: ForwardRefRenderFunction<IListRef, IProps> = (
    {todos, deleteTodo, completeTodo, editTodo}, 
    ref,
    ) => {
        const inputRefs = useMemo(() => 
            Array(todos.length)
            .fill(0)
            .map(() => 
            createRef<HTMLInputElement>())
        , [todos.length]);

        useImperativeHandle(ref, () => ({
            focus: (index:number) => {
                inputRefs[index].current?.focus()
            }
        }))


        const handleTodoBlur = (index: number) => {
            inputRefs[index].current?.focus();
        }


     return (
        <>
            {todos.map((todo, index) => (
                <div className={styles.card} key={index}>
                    {todo.completed ? (
                    <input type="text" value={todo.description} 
                    className={styles.inputCompleted} 
                    
                    />
                        
                    
                    
                    ) 
                        
                    
                        : (
                            <>
                            <input 
                            type="text" 
                            value={todo.description} 
                            ref={inputRefs[index]}
                            onChange={(e) => editTodo(e, todo.id)}
                            
                            />


                            <div className={styles.icon}>
                             <BsCheckCircle
                            onClick={() => completeTodo(todo.id)} />
                             <BiSolidEdit onClick={() => handleTodoBlur(index)}/>
                             <AiOutlineDelete
                            onClick={() => deleteTodo(todo.id)} />
                            </div>
                        </>
                    )}
                </div>
            ))}
        </>
    )
};

export const List = forwardRef(ListBase)

