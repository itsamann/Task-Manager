import React, { useState, useEffect } from "react";
import { createTask, updateTask } from "../api/taskApi";

const TaskForm = ({
  onTaskAdded,
  taskToEdit,
  onTaskUpdated,
  clearTaskToEdit,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
      setPriority(taskToEdit.priority);
      setDueDate(taskToEdit.dueDate);
    } else {
      setTitle("");
      setDescription("");
      setPriority("Medium");
      setDueDate("");
    }
  }, [taskToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTask = { title, description, priority, dueDate };
    const token = localStorage.getItem("token"); // Retrieve the token

    try {
      if (taskToEdit) {
        await updateTask(taskToEdit._id, newTask, token);
        onTaskUpdated(newTask);
        clearTaskToEdit();
      } else {
        const createdTask = await createTask(newTask, token);
        onTaskAdded(createdTask);
      }

      setTitle("");
      setDescription("");
      setPriority("Medium");
      setDueDate("");
    } catch (error) {
      console.error("Error submitting task:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Task description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <button type="submit">{taskToEdit ? "Update Task" : "Add Task"}</button>
    </form>
  );
};

export default TaskForm;
