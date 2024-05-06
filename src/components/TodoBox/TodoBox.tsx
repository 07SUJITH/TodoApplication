import React from 'react';
import styles from './TodoBox.module.css';
import { IoCloseSharp } from "react-icons/io5";

interface Todo {
    todo_id: number;
    title: string;
    isCompleted: boolean;
}

interface TodoBoxProps {
    todo: Todo;
    onDelete: (todoId: number) => void;
    onToggleComplete: (todoId: number, isCompleted: boolean) => void;
}

const TodoBox: React.FC<TodoBoxProps> = ({ todo, onDelete, onToggleComplete }) => {
    const handleDelete = () => {
        onDelete(todo.todo_id);
    };

    const handleToggleComplete = () => {
        onToggleComplete(todo.todo_id, !todo.isCompleted);
    };

    return (
        <div className={styles.card}>
            <div className={styles.circle} onClick={handleToggleComplete}>
                {todo.isCompleted ? <span className={styles.tick}>&#10003;</span> : null}
            </div>
            <div className={todo.isCompleted ? styles.titleCompleted : styles.title}>{todo.title}</div>
            <div className={styles.deleteIcon} onClick={handleDelete}>
                <IoCloseSharp />
            </div>
        </div>
    );
};

export default TodoBox;