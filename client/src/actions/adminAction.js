import axios from "../api/axios";

export const login = async (email, password) => {
  try {
    const response = await axios.post("/admin/login", {
      email,
      password,
    });

    if (!!response?.data?.result)
      localStorage.setItem("jwt", response.data.token);

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
    const response = await axios.post("/admin/register", {
      email,
      password,
    });

    return response.data;
  } catch (error) {
    if (error.response.status >= 400 && error.response.status < 600) {
      return error.response.data;
    }

    return error.response.data;
  }
};

export const fetchOrderSampah = async () => {
  try {
    const response = await axios.get("/admin/order-sampah", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt") || "",
      },
    });

    return response?.data;
  } catch (error) {
    if (error.response.status >= 400 && error.response.status < 600) {
      return error.response.data;
    }

    return error.response.data;
  }
};

export const fetChOrderSampahDetails = async (id) => {
  try {
    const response = await axios.get("/admin/order-sampah/" + id, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt") || "",
      },
    });

    return response?.data;
  } catch (error) {
    if (error.response.status >= 400 && error.response.status < 600) {
      return error.response.data;
    }

    return error.response.data;
  }
};
