import axios from "axios";
import ax from "../api/axios";

const URL = "http://localhost:5000";

export const fetchProducts = async () => {
  try {
    const response = await axios.get(URL + "/produk");

    if (!response) return null;

    return response.data;
  } catch (err) {
    console.error(err);
    return err.response.data;
  }
};

export const orderProducts = async (id) => {
  try {
    const response = await ax.post(`/produk/${id}`, {
      user_id: localStorage.getItem("id"),
      jumlah: 1,
    });

    if (!response) return null;

    return response.data;
  } catch (err) {
    return err.response.data;
  }
};
