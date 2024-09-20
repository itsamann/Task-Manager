import React, { useEffect, useState } from "react";
import { fetchTasks, deleteTask, updateTask } from "../api/taskApi";
import TaskForm from "./TaskForm";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const token = localStorage.getItem("token");
  const firstName = localStorage.getItem("firstName");
  const lastName = localStorage.getItem("lastName");

  useEffect(() => {
    const getTasks = async () => {
      try {
        const taskData = await fetchTasks(token);
        setTasks(taskData);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    getTasks();
  }, [token]);

  const handleDelete = async (id) => {
    try {
      await deleteTask(id, token);
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
      );
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
    <Container fluid className="my-4">
      {" "}
      <Row className="mb-4">
        <Col>
          <h4>
            Welcome, {firstName} {lastName}!
          </h4>
        </Col>
      </Row>
      <Row>
        {/* Sidebar for Task Form */}
        <Col md={3} className="bg-light p-4 shadow-sm my-4">
          {" "}
          <h4 className="mb-4">Add / Edit Task</h4>
          <TaskForm
            onTaskAdded={onTaskAdded}
            taskToEdit={taskToEdit}
            onTaskUpdated={onTaskUpdated}
            clearTaskToEdit={clearTaskToEdit}
          />
        </Col>

        {/* Main Area for Task List */}
        <Col md={9} className="p-4">
          <h4 className="text-center mb-4">Task List</h4>
          <Row>
            {tasks.length === 0 ? (
              <p className="text-center w-100">No tasks available</p>
            ) : (
              tasks.map((task) => (
                <Col md={6} lg={4} key={task._id} className="mb-4">
                  {" "}
                  <Card className="shadow-sm">
                    <Card.Body>
                      <Card.Title>{task.title}</Card.Title>
                      <Card.Text>
                        {task.description || "No description available."}
                      </Card.Text>
                      <Card.Text>
                        <strong>Priority:</strong> {task.priority}
                      </Card.Text>
                      <Card.Text>
                        <strong>Due Date:</strong>{" "}
                        {task.dueDate
                          ? new Date(task.dueDate).toLocaleDateString()
                          : "No due date"}
                      </Card.Text>
                      <div className="d-flex justify-content-between">
                        <Button
                          variant={task.completed ? "secondary" : "success"}
                          onClick={() =>
                            handleComplete(task._id, task.completed)
                          }
                        >
                          {task.completed ? "Mark Incomplete" : "Mark Complete"}
                        </Button>
                        <Button
                          variant="primary"
                          onClick={() => editTask(task)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => handleDelete(task._id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            )}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default TaskList;
