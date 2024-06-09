import axios from "../api/axios";

export const login = async (email, password) => {
  try {
    const response = await axios.post("/admin/login", {
      email,
      password,
    });

    if (!!response?.data?.result) {
      localStorage.setItem("jwt", response.data.token);
      localStorage.setItem("id", response.data.result.id);
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
    const response = await axios.get("/admin/order-sampah");

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
    const response = await axios.get("/admin/order-sampah/" + id);

    return response?.data;
  } catch (error) {
    if (error.response.status >= 400 && error.response.status < 600) {
      return error.response.data;
    }

    return error.response.data;
  }
};

export const changeOrderSampah = async (id, status, tanggal, berat) => {
  try {
    const response = await axios.post("/admin/order-sampah/" + id, {
      status,
      tanggal,
      berat: berat,
    });

    return response?.data;
  } catch (error) {
    if (error.response.status >= 400 && error.response.status < 600) {
      return error.response.data;
    }

    return error.response.data;
  }
};

export const convertSampah = async (id) => {
  try {
    const response = await axios.post(
      "/admin/order-sampah/" + id + "/konversi"
    );

    return response?.data;
  } catch (error) {
    if (error.response.status >= 400 && error.response.status < 600) {
      return error.response.data;
    }

    return error.response.data;
  }
};

export const fetchAllOrderProducts = async () => {
  try {
    const response = await axios.get("/admin/order-produk");

    return response?.data;
  } catch (error) {
    if (error.response.status >= 400 && error.response.status < 600) {
      return error.response.data;
    }

    return error.response.data;
  }
};

export const fetchOrderProdukDetails = async (id) => {
  try {
    const response = await axios.get("/admin/order-produk/" + id);

    return response?.data;
  } catch (error) {
    if (error.response.status >= 400 && error.response.status < 600) {
      return error.response.data;
    }

    return error.response.data;
  }
};

export const changeOrderProduk = async (id, status) => {
  try {
    const response = await axios.post("/admin/order-produk/" + id, {
      status,
    });

    return response?.data;
  } catch (error) {
    if (error.response.status >= 400 && error.response.status < 600) {
      return error.response.data;
    }

    return error.response.data;
  }
};

export const fetchProductDetails = async (id) => {
  try {
    const response = await axios.get("/admin/produk/" + id);

    return response?.data;
  } catch (error) {
    if (error.response.status >= 400 && error.response.status < 600) {
      return error.response.data;
    }

    return error.response.data;
  }
};

export const createProduk = async (nama, stok, harga_koin, gambar) => {
  try {
    const response = await axios.post("/admin/produk/", {
      nama,
      gambar,
      harga_koin: parseInt(harga_koin),
      stok: parseInt(stok),
    });

    return response?.data;
  } catch (error) {
    if (error.response.status >= 400 && error.response.status < 600) {
      return error.response.data;
    }

    return error.response.data;
  }
};

export const changeProduk = async (id, nama, gambar, harga_koin, stok) => {
  try {
    const response = await axios.post("/admin/produk/" + id, {
      nama,
      gambar,
      harga_koin,
      stok,
    });

    return response?.data;
  } catch (error) {
    if (error.response.status >= 400 && error.response.status < 600) {
      return error.response.data;
    }

    return error.response.data;
  }
};
