// components/TaskList.js
import React, { useEffect, useState } from "react";
import { fetchTasks, deleteTask, updateTask } from "../api/taskApi";
import TaskForm from "./TaskForm";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const token = localStorage.getItem("token"); // Retrieve the token

  useEffect(() => {
    const getTasks = async () => {
      try {
        const taskData = await fetchTasks(token); // Pass the token
        setTasks(taskData);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    getTasks();
  }, [token]); // Add token to dependency array

  const handleDelete = async (id) => {
    try {
      await deleteTask(id, token); // Pass the token
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleComplete = async (id, completed) => {
    try {
      const updatedTask = await updateTask(
        id,
        { completed: !completed },
        token
      ); // Pass the token
      setTasks(tasks.map((task) => (task._id === id ? updatedTask : task)));
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const onTaskAdded = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const onTaskUpdated = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === taskToEdit._id ? { ...task, ...updatedTask } : task
      )
    );
  };

  const editTask = (task) => {
    setTaskToEdit(task);
  };

  const clearTaskToEdit = () => {
    setTaskToEdit(null);
  };

  return (
    <div>
      <h1>Task List</h1>
      <TaskForm
        onTaskAdded={onTaskAdded}
        taskToEdit={taskToEdit}
        onTaskUpdated={onTaskUpdated}
        clearTaskToEdit={clearTaskToEdit}
      />
      {tasks.map((task) => (
        <div key={task._id}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <button onClick={() => handleComplete(task._id, task.completed)}>
            {task.completed ? "Mark Incomplete" : "Mark Complete"}
          </button>
          <button onClick={() => handleDelete(task._id)}>Delete</button>
          <button onClick={() => editTask(task)}>Edit</button>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
