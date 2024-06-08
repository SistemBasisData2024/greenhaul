import { useEffect, useState } from "react";

import Loading from "../components/Loading";

import { fetchProducts } from "../actions/storeActions";

const Store = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    (async function () {
      const data = await fetchProducts();

      setProducts(data || []);
    })();

    setLoading(false);
  }, []);

  return (
    <div className="mx-4 px-4 pb-4 min-h-screen">
      {loading && <Loading />}

      <h1 className="text-2xl font-bold my-4 text-header">Store</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="border-primary-green border-2 text-primary-green p-4 rounded-md flex flex-col gap-4"
          >
            <h2 className="text-lg font-bold text-primary-green">
              {product.nama}
            </h2>

            <div className="flex flex-col gap-0.5">
              <p className="">{product.gambar || "Gambar"}</p>
              <p className="">Price: {product.harga_koin} Coins</p>
              <p className="">Stock: {product.stok}</p>
            </div>

            <button onClick={() => console.log("asd")} className="button">
              Order
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Store;
