import React, { useState } from 'react';
import './TaskManagement.css';

export default function TaskManagement() {
    const [tasks, setTasks] = useState([
        {
            id: 1,
            title: 'Complete Project Proposal',
            category: 'Work',
            priority: 'High',
            dueDate: '2026-03-01',
            completed: false,
            selected: false,
        },
        {
            id: 2,
            title: 'Buy Groceries',
            category: 'Personal',
            priority: 'Low',
            dueDate: '2026-12-31',
            completed: true,
            selected: false,
        },
    ]);

    // Form inputs
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('Work');
    const [priority, setPriority] = useState('Medium');
    const [dueDate, setDueDate] = useState('');

    // Filter selections
    const [statusFilter, setStatusFilter] = useState('All');
    const [priorityFilter, setPriorityFilter] = useState('All');
    const [categoryFilter, setCategoryFilter] = useState('All');

    // Check if task date is past today
    const isOverdue = (dateString, completed) => {
        if (!dateString || completed) return false;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const taskDate = new Date(dateString);
        return taskDate < today;
    };

    // Add Task
    const handleAddTask = (e) => {
        e.preventDefault();
        if (!title.trim()) return;

        const newTask = {
            id: Date.now(),
            title,
            category,
            priority,
            dueDate,
            completed: false,
            selected: false,
        };

        setTasks([...tasks, newTask]);
        setTitle('');
        setDueDate('');
    };

    // Toggle Completion
    const toggleComplete = (id) => {
        setTasks(
            tasks.map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    };

    // Toggle Selection for Bulk Actions
    const toggleSelect = (id) => {
        setTasks(
            tasks.map((task) =>
                task.id === id ? { ...task, selected: !task.selected } : task
            )
        );
    };

    // Select / Deselect All
    const handleSelectAll = (e) => {
        const isChecked = e.target.checked;
        setTasks(tasks.map((task) => ({ ...task, selected: isChecked })));
    };

    // Bulk Delete
    const handleDeleteSelected = () => {
        setTasks(tasks.filter((task) => !task.selected));
    };

    // Apply dynamic filters
    const filteredTasks = tasks.filter((task) => {
        const matchesStatus =
            statusFilter === 'All'
                ? true
                : statusFilter === 'Completed'
                    ? task.completed
                    : !task.completed;

        const matchesPriority =
            priorityFilter === 'All' || task.priority === priorityFilter;

        const matchesCategory =
            categoryFilter === 'All' || task.category === categoryFilter;

        return matchesStatus && matchesPriority && matchesCategory;
    });

    const allSelected =
        filteredTasks.length > 0 &&
        filteredTasks.every((task) => task.selected);

    return (
        <div className="task-manager-container">
            <h2>Task Management with Categories</h2>

            {/* --- ADD TASK FORM --- */}
            <form onSubmit={handleAddTask} className="task-form">
                <input
                    type="text"
                    placeholder="Task title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="Work">Work</option>
                    <option value="Personal">Personal</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Health">Health</option>
                </select>
                <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                    <option value="Low">Low Priority</option>
                    <option value="Medium">Medium Priority</option>
                    <option value="High">High Priority</option>
                </select>
                <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                />
                <button type="submit" className="add-btn">
                    Add Task
                </button>
            </form>

            {/* --- FILTERS & BULK ACTIONS --- */}
            <div className="controls-bar">
                <div className="filters">
                    <div>
                        <label>Status: </label>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option value="All">All</option>
                            <option value="Pending">Pending</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>

                    <div>
                        <label>Priority: </label>
                        <select
                            value={priorityFilter}
                            onChange={(e) => setPriorityFilter(e.target.value)}
                        >
                            <option value="All">All</option>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>

                    <div>
                        <label>Category: </label>
                        <select
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                        >
                            <option value="All">All</option>
                            <option value="Work">Work</option>
                            <option value="Personal">Personal</option>
                            <option value="Shopping">Shopping</option>
                            <option value="Health">Health</option>
                        </select>
                    </div>
                </div>

                <div className="bulk-actions">
                    <label>
                        <input
                            type="checkbox"
                            checked={allSelected}
                            onChange={handleSelectAll}
                        />
                        Select All
                    </label>
                    <button
                        onClick={handleDeleteSelected}
                        className="delete-btn"
                        disabled={!tasks.some((t) => t.selected)}
                    >
                        Delete Selected
                    </button>
                </div>
            </div>

            {/* --- TASK LIST / EMPTY STATE --- */}
            {filteredTasks.length === 0 ? (
                <div className="empty-state">
                    <p>No tasks match your current filter combination.</p>
                </div>
            ) : (
                <ul className="task-list">
                    {filteredTasks.map((task) => {
                        const overdue = isOverdue(task.dueDate, task.completed);
                        return (
                            <li
                                key={task.id}
                                className={`task-item ${task.completed ? 'completed' : ''} ${overdue ? 'overdue' : ''
                                    }`}
                            >
                                <div className="task-left">
                                    <input
                                        type="checkbox"
                                        checked={task.selected}
                                        onChange={() => toggleSelect(task.id)}
                                    />
                                    <input
                                        type="checkbox"
                                        checked={task.completed}
                                        onChange={() => toggleComplete(task.id)}
                                        className="status-toggle"
                                    />
                                    <span className="task-title">{task.title}</span>
                                </div>

                                <div className="task-details">
                                    <span className="badge category-badge">{task.category}</span>
                                    <span className={`badge priority-${task.priority.toLowerCase()}`}>
                                        {task.priority}
                                    </span>
                                    {task.dueDate && (
                                        <span className="due-date">Due: {task.dueDate}</span>
                                    )}
                                    {overdue && <span className="overdue-badge">OVERDUE</span>}
                                </div>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}