// Install axios for making API requests: npm install axios
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_KEY = 'YOUR_CRUDAPI_KEY';
const API_URL = 'https://crudapi.co.uk/your-app-id/tasks';

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    // Fetch tasks from the API on component mount
    axios.get(API_URL, { headers: { 'X-API-Key': API_KEY } })
      .then(response => setTasks(response.data))
      .catch(error => console.error('Error fetching tasks:', error));
  }, []);

  const addTask = () => {
    // Add a new task to the API
    axios.post(API_URL, { name: newTask, isCompleted: false }, { headers: { 'X-API-Key': API_KEY } })
      .then(response => setTasks([...tasks, response.data]))
      .catch(error => console.error('Error adding task:', error));
    setNewTask('');
  };

  const updateTask = (taskId, updates) => {
    // Update a task in the API
    axios.put(`${API_URL}/${taskId}`, updates, { headers: { 'X-API-Key': API_KEY } })
      .then(response => setTasks(tasks.map(task => (task.id === taskId ? response.data : task))))
      .catch(error => console.error('Error updating task:', error));
  };

  const handleTaskChange = (taskId, isCompleted) => {
    // Toggle the isCompleted status of a task
    updateTask(taskId, { isCompleted: !isCompleted });
  };

  const handleTaskEdit = (taskId, newName) => {
    // Update the name of a task
    updateTask(taskId, { name: newName });
  };

  const handleDeleteTask = (taskId) => {
    // Delete a task from the API
    axios.delete(`${API_URL}/${taskId}`, { headers: { 'X-API-Key': API_KEY } })
      .then(() => setTasks(tasks.filter(task => task.id !== taskId)))
      .catch(error => console.error('Error deleting task:', error));
  };

  return (
    <div>
      <h1>TODO App</h1>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.isCompleted}
              onChange={() => handleTaskChange(task.id, task.isCompleted)}
            />
            <span>{task.name}</span>
            <button onClick={() => handleTaskEdit(task.id, prompt('Edit task:', task.name))}>Edit</button>
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <div>
        <input type="text" value={newTask} onChange={(e) => setNewTask(e.target.value)} />
        <button onClick={addTask}>Add Task</button>
      </div>
    </div>
  );
};

export default TodoApp;
