import React, { useState } from 'react';

const CATEGORIES = ['Food', 'Transport', 'Entertainment', 'Bills', 'Other'];

export default function ExpenseTracker() {
  const [expenses, setExpenses] = useState([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleAddExpense = (e) => {
    e.preventDefault();
    if (!description.trim() || !amount || parseFloat(amount) <= 0) return;

    const newExpense = {
      id: Date.now(),
      description,
      amount: parseFloat(amount),
      category,
    };

    setExpenses([...expenses, newExpense]);
    setDescription('');
    setAmount('');
    setCategory(CATEGORIES[0]);
  };

  const handleDeleteExpense = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  const filteredExpenses =
    selectedCategory === 'All'
      ? expenses
      : expenses.filter((e) => e.category === selectedCategory);

  const totalExpenses = filteredExpenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  return (
    <div style={{ maxWidth: '500px', margin: '20px auto', fontFamily: 'sans-serif' }}>
      <h2>Personal Expense Tracker</h2>

      <form onSubmit={handleAddExpense} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Amount ($)"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <button type="submit">Add Expense</button>
      </form>

      {/* Filter by Category */}
      <div style={{ marginBottom: '15px' }}>
        <label style={{ marginRight: '10px' }}>Filter by Category:</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="All">All</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Expense List */}
      <h3>Expenses</h3>
      {filteredExpenses.length === 0 ? (
        <p>No expenses found.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {filteredExpenses.map((expense) => (
            <li
              key={expense.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '8px',
                borderBottom: '1px solid #ccc',
              }}
            >
              <span>
                <strong>{expense.description}</strong> ({expense.category}) - ${expense.amount.toFixed(2)}
              </span>
              <button onClick={() => handleDeleteExpense(expense.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}

      {/* Total Expenses */}
      <h3 style={{ marginTop: '20px' }}>
        Total: ${totalExpenses.toFixed(2)}
      </h3>
    </div>
  );
}