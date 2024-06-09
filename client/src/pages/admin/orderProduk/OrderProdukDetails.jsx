import { useEffect, useState } from "react";
import {
  changeOrderProduk,
  fetchOrderProdukDetails,
} from "../../../actions/adminAction";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../../components/Loading";

const OrderProdukDetails = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState({});
  const [status, setStatus] = useState("PESANAN DIBELI");

  const { id } = useParams();

  useEffect(() => {
    (async function () {
      setLoading(true);

      const res = await fetchOrderProdukDetails(id);

      setOrder(res.result);

      setLoading(false);
    })();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const a = await changeOrderProduk(id, status);

    if (!!a) {
      navigate("/admin/order-produk");
    }
  };

  return (
    <div className="w-screen min-h-screen p-8">
      {loading && <Loading />}
      <h1 className="text-header text-lg text-white">Order Produk Detail</h1>

      <div className="border-2 border-primary-green px-4 py-2 mt-6 rounded-lg">
        <div>
          <h1 className="font-black text-xl text-primary-green">
            DETAIL PRODUK
          </h1>

          <div className="text-lg">
            <img
              alt={order["Nama Produk"]}
              src={order["Foto Produk"]}
              className="my-2"
              title={order["Nama Produk"]}
            />
            <div className="grid grid-cols-2">
              <h1>Nama</h1>
              <h1 className="text-end text-primary-green font-semibold">
                {order["Nama Produk"]}
              </h1>
            </div>

            <div className="grid grid-cols-2">
              <h1>Harga</h1>
              <h1 className="text-end text-primary-green font-semibold">
                {order["Harga Produk"]} Koin
              </h1>
            </div>

            <div className="grid grid-cols-2">
              <h1>Stok</h1>
              <h1 className="text-end text-primary-green font-semibold">
                {order["Stok Produk"]} Unit
              </h1>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <h1 className="font-black text-xl text-primary-green">
            DETAIL PEMESAN
          </h1>

          <div className="text-lg">
            <div className="grid grid-cols-2">
              <h1>Nama</h1>
              <h1 className="text-end text-primary-green font-semibold">
                {order["Nama Pemesan"]}
              </h1>
            </div>

            <div className="grid grid-cols-2">
              <h1>Email</h1>
              <h1 className="text-end text-primary-green font-semibold">
                {order["Alamat Pemesan"]}
              </h1>
            </div>

            <div className="grid grid-cols-2">
              <h1>Jumlah Koin</h1>
              <h1 className="text-end text-primary-green font-semibold">
                {order["Jumlah Koin Pemesan"]} koin
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h1 className="text-header text-lg text-white">CHANGE DETAIL</h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center border-2 border-primary-green px-4 py-2 mt-6 rounded-lg"
        >
          <div className="grid grid-cols-2 w-full mb-4">
            <label htmlFor="status" className="text-start font-semibold">
              STATUS PESANAN
            </label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-primary-green"
            >
              <option value="">Pilih Status</option>
              <option value="PESANAN DIBELI">PESANAN DIBELI</option>
              <option value="PESANAN DIANTAR">PESANAN DIANTAR</option>
              <option value="PESANAN SELESAI">PESANAN SELESAI</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-primary-green text-white px-4 py-2 rounded-md mt-4"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default OrderProdukDetails;
