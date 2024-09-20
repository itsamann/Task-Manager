import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const registerUser = async (email, password, firstName, lastName) => {
  try {
    const { data } = await axios.post(`${API_URL}/auth/register`, {
      email,
      password,
      firstName, // Include firstName
      lastName, // Include lastName
    });
    return data;
  } catch (error) {
    console.error("Error registering user", error);
    throw error;
  }
};

export const loginUser = async (email, password) => {
  try {
    const { data } = await axios.post(`${API_URL}/auth/login`, {
      email,
      password,
    });
    return data;
  } catch (error) {
    console.error("Error logging in", error);
    throw error;
  }
};
