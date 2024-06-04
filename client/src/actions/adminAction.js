import axios from "axios";

const SERVER = "http://localhost:5000/admin";

export const login = async (email, password) => {
  try {
    const response = await axios.post(SERVER + "/login", {
      email,
      password,
    });

    if (!response) {
      console.log("Login tidak berhasil");
      return null;
    }

    return response.data;
  } catch (error) {
    if (error.response.status >= 400 && error.response.status < 600) {
      return error.response.data;
    }

    return error.response.data;
  }
};

export const register = async (email, password) => {
  try {
    const response = await axios.post(SERVER + "/register", {
      email,
      password,
    });

    if (!response) {
      console.log("Register tidak berhasil");
      return null;
    }

    return response.data;
  } catch (error) {
    if (error.response.status >= 400 && error.response.status < 600) {
      return error.response.data;
    }

    return error.response.data;
  }
};
