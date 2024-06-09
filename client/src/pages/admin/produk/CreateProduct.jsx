import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { createProduk } from "../../../actions/adminAction";

import Loading from "../../../components/Loading";

import { convertBase64 } from "../../../utils";

const CreateProduct = () => {
  const navigate = useNavigate();

  const [nama, setNama] = useState("");
  const [gambar, setGambar] = useState("");
  const [harga, setHarga] = useState(0);
  const [stok, setStok] = useState(0);

  const [loading, setLoading] = useState(false);

  const handleAction = async () => {
    setLoading(true);

    const d = await createProduk(nama, stok, harga, gambar);

    setLoading(false);

    if (!!d.result) {
      navigate("/admin/produk");
    }
  };

  const uploadImage = async (event) => {
    const files = event.target.files;

    const base64 = await convertBase64(files[0]);

    setGambar(base64);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-secondary-green px-4">
      {loading && <Loading />}
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-primary-green">
            Product Details
          </h2>
        </div>

        <div>
          <img
            alt={nama}
            src={gambar}
            className="my-2 w-60 mx-auto"
            title={nama}
          />
          <input type="file" className="mx-auto block" onChange={uploadImage} />
        </div>

        <form className="flex flex-col gap-4 text-primary-green">
          <div>
            <label className="">Nama</label>
            <input
              type="text"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              className={`mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-primary-green focus:border-primary-green`}
              required
            />
          </div>

          <div>
            <label className="">Harga</label>
            <input
              type="number"
              min={0}
              value={harga}
              onChange={(e) => setHarga(e.target.value)}
              className={`mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-primary-green focus:border-primary-green`}
              required
            />
          </div>

          <div>
            <label className="">Stok</label>
            <input
              type="number"
              min={0}
              value={stok}
              onChange={(e) => setStok(e.target.value)}
              className={`mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-primary-green focus:border-primary-green`}
              required
            />
          </div>

          <button
            type="button"
            className="button font-bold self-center disabled:bg-slate-500"
            onClick={handleAction}
          >
            {loading ? "Loading..." : "Create Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
