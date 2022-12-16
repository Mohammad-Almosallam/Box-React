import axios from "axios";

const API_URL = "/api/users/";

const register = async (userData) => {
  try {
    const response = await axios.post(API_URL, userData);

    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response;
  } catch (err) {
    return err.response;
  }
};

const login = async (userData) => {
  try {
    const response = await axios.post(API_URL + "login", userData);

    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response;
  } catch (err) {
    return err.response;
  }
};

const updateUser = async (userId, userData) => {
  try {
    const response = await axios.put(API_URL + userId, userData);

    if (response.data) {
      await localStorage.removeItem("user");
      await localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response;
  } catch (err) {
    return err.response;
  }
};

const getUser = async (userId) => {
  try {
    const response = await axios.get(API_URL + userId);

    return response;
  } catch (err) {
    return err.response;
  }
};

const getAllUsers = async () => {
  try {
    const response = await axios.get(API_URL);

    return response;
  } catch (err) {
    return err.response;
  }
};

const logout = () => {
  localStorage.removeItem("user");
};

export { register, login, logout, updateUser, getUser, getAllUsers };
