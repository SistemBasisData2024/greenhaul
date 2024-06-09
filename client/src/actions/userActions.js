import axios from "../api/axios";
import { formatToPostgresTimestamp } from "../utils";

export const login = async (email, password) => {
  try {
    const response = await axios.post("/user/login", {
      email,
      password,
    });

    if (!!response.data) {
      localStorage.setItem("jwt", response.data.token);
      localStorage.setItem("id", response.data.userid);
    }

    return response.data;
  } catch (error) {
    if (error.response.status >= 400 && error.response.status < 600) {
      return error.response.data;
    }

    return error.response.data;
  }
};

export const register = async (email, password, nama, alamat) => {
  try {
    const response = await axios.post("/user/register", {
      email,
      password,
      nama,
      alamat,
    });

    return response.data;
  } catch (error) {
    if (error.response.status >= 400 && error.response.status < 600) {
      return error.response.data;
    }

    return error.response.data;
  }
};

export const getOrderSampah = async () => {
  try {
    const response = await axios.get(
      `/user/${localStorage.getItem("id")}/order-sampah`
    );

    return response.data;
  } catch (error) {
    if (error.response.status >= 400 && error.response.status < 600) {
      return error.response.data;
    }

    return error.response.data;
  }
};

export const createOrderSampah = async (tanggal) => {
  try {
    const response = await axios.post("/user/order-sampah", {
      id_pemesan: localStorage.getItem("id"),
      tanggal: formatToPostgresTimestamp(tanggal),
      berat: 0,
    });

    return response.data;
  } catch (error) {
    if (error.response.status >= 400 && error.response.status < 600) {
      return error.response.data;
    }

    return error.response.data;
  }
};

export const getProfile = async () => {
  try {
    const response = await axios.get(`/profile/${localStorage.getItem("id")}`);

    return response.data;
  } catch (error) {
    if (error.response.status >= 400 && error.response.status < 600) {
      return error.response.data;
    }

    return error.response.data;
  }
};

export const changeProfile = async (nama, alamat, email) => {
  try {
    const response = await axios.post(
      `/profile/${localStorage.getItem("id")}`,
      {
        nama,
        alamat,
        email,
      }
    );

    return response.data;
  } catch (error) {
    if (error.response.status >= 400 && error.response.status < 600) {
      return error.response.data;
    }

    return error.response.data;
  }
};
