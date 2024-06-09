import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { fetchProducts, orderProducts } from "../actions/storeActions";
import { useNavigate } from "react-router-dom";

const Store = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleOrder = async (id) => {
    if (!localStorage.getItem("id")) {
      navigate("/user/login");
      return;
    }
    const d = await orderProducts(id);
    if (!d) {
      alert("Failed!");
      return;
    }
    if (d.message?.includes("coins")) {
      alert("Your coins is not enough!");
      return;
    }
    navigate(0);
  };

  useEffect(() => {
    setLoading(true);

    (async function fetchAndSetProducts() {
      const data = await fetchProducts();
      setProducts(data || []);
      setLoading(false);
    })();
  }, []);

  return (
    <div className="bg-[#cbddd1] min-h-screen p-4">
      {loading && <Loading />}

      <h1 className="text-2xl font-bold my-4 text-center text-green-800"></h1>

      <div className="grid grid-cols-3 gap-7">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex flex-col border-green-800 border-2 rounded-lg p-4"
          >
            <h2 className="text-lg font-bold text-green-800 mb-2">{product.nama}</h2>
            <img src={product.gambar} alt={product.nama} className="mb-2 h-40 w-full object-cover"/>
            <p className="text-green-800">Price: {product.harga_koin} Coins</p>
            <p className="text-green-800">Stock: {product.stok}</p>
            <button
              onClick={() => handleOrder(product.id)}
              className="mt-auto bg-green-800 text-white py-2 px-4 rounded hover:bg-white hover:text-green-800 border border-green-800 transition-colors duration-300"
            >
              Order
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Store;