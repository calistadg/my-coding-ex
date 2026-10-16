import React, { useState } from 'react';

function ToDoList() {
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const addTodo = () => {
        if (inputValue.trim()) {
            setTodos(prevTodos => [
                ...prevTodos,
                { id: Date.now(), text: inputValue, completed: false }
            ]);
            setInputValue('');
        }
    };

    const toggleTodo = (id) => {
        setTodos(prevTodos =>
            prevTodos.map(todo =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    const deleteTodo = (id) => {
        setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
    };

    return (
        <div>
            <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Add a todo"
            />
            <button onClick={addTodo}>Add</button>
            <u1>
                {todos.map(todo => (
                    <li key={todo.id}>
                        <span
                        style={{
                            textDecoration: todo.completed ? 'line-through' : 'none'
                        }}
                        onClick={() => toggleTodo(todo.id)}
                        >
                            {todo.text}
                        </span>
                        <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                    </li>
                ))}
            </u1>
        </div>
    );
}

export default ToDoList;
