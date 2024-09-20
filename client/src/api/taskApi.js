import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

// Fetch all tasks
export const fetchTasks = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/tasks`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks", error);
    throw error;
  }
};

// Create a new task
export const createTask = async (task, token) => {
  try {
    const response = await axios.post(`${API_URL}/tasks`, task, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating task", error);
    throw error;
  }
};

// Update a task
export const updateTask = async (id, updatedTask, token) => {
  try {
    const response = await axios.put(`${API_URL}/tasks/${id}`, updatedTask, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating task", error);
    throw error;
  }
};

// Delete a task
export const deleteTask = async (id, token) => {
  try {
    const response = await axios.delete(`${API_URL}/tasks/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting task", error);
    throw error;
  }
};
