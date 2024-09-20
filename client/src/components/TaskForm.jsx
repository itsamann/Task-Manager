import React, { useState, useEffect } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
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
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Set the fields when editing a task
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

  // Clear success and error messages after 3 seconds
  useEffect(() => {
    if (message || error) {
      const timer = setTimeout(() => {
        setMessage("");
        setError("");
      }, 3000); // Clear after 3 seconds

      return () => clearTimeout(timer);
    }
  }, [message, error]);

  // Handle task submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTask = { title, description, priority, dueDate };
    const token = localStorage.getItem("token");

    try {
      if (taskToEdit) {
        await updateTask(taskToEdit._id, newTask, token);
        onTaskUpdated(newTask);
        clearTaskToEdit();
        setMessage("Task updated successfully!");
      } else {
        const createdTask = await createTask(newTask, token);
        onTaskAdded(createdTask);
        setMessage("Task added successfully!");
      }

      // Clear the form
      setTitle("");
      setDescription("");
      setPriority("Medium");
      setDueDate("");
      setError("");
    } catch (error) {
      console.error("Error submitting task:", error);
      setError("Failed to submit task. Please try again.");
    }
  };

  return (
    <Container className="my-4">
      {" "}
      <h2 className="text-center mb-4">
        {taskToEdit ? "Edit Task" : "Add Task"}
      </h2>{" "}
      {/* Show success message */}
      {message && (
        <Alert variant="success" className="my-3">
          {message}
        </Alert>
      )}{" "}
      {/* Show error message */}
      {error && (
        <Alert variant="danger" className="my-3">
          {error}
        </Alert>
      )}{" "}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="taskTitle" className="my-3">
          {" "}
          <Form.Label>Task Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="taskDescription" className="my-3">
          <Form.Label>Task Description</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Enter task description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="taskPriority" className="my-3">
          <Form.Label>Priority</Form.Label>
          <Form.Control
            as="select"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="taskDueDate" className="my-3">
          <Form.Label>Due Date</Form.Label>
          <Form.Control
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100 mt-4">
          {taskToEdit ? "Update Task" : "Add Task"}
        </Button>
      </Form>
    </Container>
  );
};

export default TaskForm;
