
import React, { useEffect, useState } from 'react';
import styles from './TodoDashboard.module.css';
import { BsBoxArrowInDown } from "react-icons/bs";
import TodoBox from '../TodoBox/TodoBox';

const TodoDashboard: React.FC = () => {
    const [todos, setTodos] = useState<Array<{ todo_id: number, title: string, isCompleted: boolean }>>([]);
    const [category, setCategory] = useState('all');
    const [itemLeft, setItemLeft] = useState(0);
    useEffect(() => {
        const countIncompleteTodos = () => {
            let count = 0;
            todos.forEach(todo => {
                if (!todo.isCompleted) {
                    count++;
                }
            });
            setItemLeft(count);
        };

        countIncompleteTodos();
    }, [todos]);
    const handleCategoryChange = (newCategory: string) => {
        setCategory(newCategory);
    };
    
    const filteredTodos = todos.filter(todo => {
        if (category === 'all') return true;
        if (category === 'active') return !todo.isCompleted;
        if (category === 'completed') return todo.isCompleted;
    });

    const todoCount = todos.length;
    console.log(`Number of todos: ${todoCount}`);
    let todo_id_helper = todoCount;


    const handleDeleteTodo = (todoId: number) => {
        setTodos(todos.filter(todo => todo.todo_id !== todoId));
    };

    const handleToggleComplete = (todoId: number, isCompleted: boolean) => {
        setTodos(todos.map(todo => todo.todo_id === todoId ? { ...todo, isCompleted } : todo));
    };
    const [newTodo, setNewTodo] = useState('');
    const handleRemoveCompleted = () => {
        const newTodos = todos.filter(todo => !todo.isCompleted);
        setTodos(newTodos);
    };
    const handleAddTodo = () => {
        if (newTodo.trim() !== '') {
            setTodos([...todos, {todo_id:todo_id_helper,title:newTodo,isCompleted: false}]);
            setNewTodo('');
            todo_id_helper += 1;
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleAddTodo();
        }
    };

    return (
        <div className={styles.todoDashboardBackground}>
            <div className={styles.dashboardContent}>
                <div className={styles.topSection}>
                    <div className={styles.addTodoBox}>
                        <input
                            className={styles.todoinput}
                            type="text"
                            value={newTodo}
                            onChange={(event) => setNewTodo(event.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder='  type tasks...'
                        />
                        <span className={styles.todoButton} onClick={handleAddTodo}>
                        <BsBoxArrowInDown size={32} />
                        </span>
                    </div>
                </div>
                {
                    todos.length > 0 ? 
                    <>
                        <ul className={styles.todoList}>
                         {filteredTodos.map(todo => (
                <TodoBox key={todo.todo_id} todo={todo} onDelete={handleDeleteTodo} onToggleComplete={handleToggleComplete} />
            ))}
                        
                        </ul>
                    <div className={styles.infoBox}>
                        <div className={`${styles.infoItem} ${styles.normalText}`}>
                            {`${itemLeft} items left`}
                        </div>
                        <div className={ `${styles.infoItem} ${styles.category}` }>
                        <button className={ category === 'all' ? styles.selectedText : styles.normalText} onClick={() => handleCategoryChange('all')}>All</button>
                        <button className={ category === 'active' ? styles.selectedText : styles.normalText} onClick={() => handleCategoryChange('active')}>Active</button>
                        <button className={ category === 'completed' ? styles.selectedText : styles.normalText} onClick={() => handleCategoryChange('completed')}>Completed</button>

                        </div>
                        <div className={styles.infoItem}>
                        <button className={styles.normalText} onClick={handleRemoveCompleted}>Clear completed</button>
                        </div>
                    </div>
                        
                    </>
                    
                    :
                    <ul className={styles.todoList} style={{ textAlign: 'center' }}>
                        <li>No tasks left </li>
                    </ul>
                }
            </div>
        </div>
    );
};

export default TodoDashboard;
