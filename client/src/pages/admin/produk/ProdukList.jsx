import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { fetchProducts } from "../../../actions/storeActions";

import Loading from "../../../components/Loading";

const ProdukList = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    (async function fetchAndSetProducts() {
      const data = await fetchProducts();
      setProducts(data || []);
    })();

    console.log(products);

    setLoading(false);
  }, []);

  return (
    <div className="bg-secondary min-h-screen p-4">
      {loading && <Loading />}

      <div className="flex gap-4 items-center">
        <h1 className="text-header text-white text-2xl font-bold my-4 text-center ">
          Product Lists
        </h1>

        <Link
          className="font-semibold bg-white text-primary-green button"
          to={"/admin/produk/create"}
        >
          Create Product
        </Link>
      </div>

      <div className="flex flex-wrap gap-4 justify-center">
        {products.map((product) => (
          <Link
            key={product.id}
            to={"/admin/produk/" + product.id}
            className="flex flex-col border-green-800 border-2 rounded-lg p-4 min-w-48"
          >
            <h2 className="text-lg font-bold text-primary-green">
              {product.nama}
            </h2>

            <div className="flex flex-col gap-0.5">
              <img
                alt={product.nama}
                src={product.gambar}
                className="my-2 w-60"
                title={product.nama}
              />
              <p className="">Price: {product.harga_koin} Coins</p>
              <p className="">Stock: {product.stok}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProdukList;
