import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const registerUser = async (email, password, firstName, lastName) => {
  try {
    const { data } = await axios.post(`${API_URL}/auth/register`, {
      email,
      password,
      firstName,
      lastName,
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

    const { token, firstName, lastName } = data;

    // Store token and user details in local storage
    localStorage.setItem("token", token);
    localStorage.setItem("firstName", firstName);
    localStorage.setItem("lastName", lastName);

    return data;
  } catch (error) {
    console.error("Error logging in", error);
    throw error;
  }
};
