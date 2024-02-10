import React, { useState, useEffect } from 'react';

const API_KEY = 'Nt_E-uxDP30HQ2EUBtAR15L1ec6864f7JRG75QWBcJ5TtN8Pbw'; 

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    fetch('/api/v1/tasks', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${API_KEY}`
      }
    })
    .then((response) => {
      if(!response.ok) throw new Error("Response failed")
      return response.json()
    })

    .then((data) => setTasks(data.items.map (task => {
      return{
        name: task.name,
        id: task._uuid
      }
    })))
    .catch((error) => console.error('Error fetching tasks:', error));
  };

  ///============================================
  ///POST
  ///============================================

  const addTask = () => {
    fetch('/api/v1/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify([{ name: newTask, isCompleted: false }])
    })
      .then((response) => {
        if(!response.ok) throw new Error("Response failed")
        return response.json()
      })
      .then((data) => {
        setTasks([ {
          name: data.items[0].name,
          id: data.items[0]._uuid
        },...tasks]);
        setNewTask('');
      })
      .catch((error) => console.error('Error adding task:', error));
  };

  const handleTaskChange = (taskId) => {
  };

  const handleTaskEdit = (taskId) => {
  };

  return (
    <div>
      <h1>TODO App</h1>
      
      <div>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.isCompleted}
              onChange={() => handleTaskChange(task.id)}
            />
            {task.name}
            <button onClick={() => handleTaskEdit(task.id)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;