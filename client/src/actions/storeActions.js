import axios from "axios";

const URL = "http://localhost:5000";

export const fetchProducts = async () => {
  try {
    const response = await axios.get(URL + "/produk");

    if (!response) return null;

    return response.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};
