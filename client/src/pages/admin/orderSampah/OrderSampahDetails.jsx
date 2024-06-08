import { useEffect, useState } from "react";
import { fetChOrderSampahDetails } from "../../../actions/adminAction";
import { useLocation } from "react-router-dom";
import { formatDate } from "../../../utils";
import ChangeOrderDetail from "../../../components/ChangeOrderDetail";

const OrderSampahDetails = () => {
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState({});

  const id = useLocation().pathname.split("/")[3];

  useEffect(() => {
    (async function () {
      setLoading(true);

      const res = await fetChOrderSampahDetails(id);

      setOrder(res.result);

      setLoading(false);
    })();
  }, []);

  return (
    <div className="w-screen min-h-screen p-8">
      <h1 className="text-header text-lg text-white">Order sampah Detail</h1>

      <div className="border-2 border-primary-green px-4 py-2 mt-6 rounded-lg">
        <div>
          <h1 className="font-black text-xl text-primary-green">
            DETAIL PESANAN
          </h1>

          <div className="text-lg">
            <div className="grid grid-cols-2">
              <h1>Status</h1>
              <h1 className="text-end text-primary-green font-semibold">
                {order.status}
              </h1>
            </div>

            <div className="grid grid-cols-2">
              <h1>Berat</h1>
              <h1 className="text-end text-primary-green font-semibold">
                {order.berat} kg
              </h1>
            </div>

            <div className="grid grid-cols-2">
              <h1>Tanggal</h1>
              <h1 className="text-end text-primary-green font-semibold">
                {formatDate(new Date(order.tanggal))}
              </h1>
            </div>

            <div className="grid grid-cols-2">
              <h1>Alamat</h1>
              <h1 className="text-end text-primary-green font-semibold">
                {order.alamat}
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
                {order.nama}
              </h1>
            </div>

            <div className="grid grid-cols-2">
              <h1>Email</h1>
              <h1 className="text-end text-primary-green font-semibold">
                {order.email}
              </h1>
            </div>

            <div className="grid grid-cols-2">
              <h1>Jumlah Koin</h1>
              <h1 className="text-end text-primary-green font-semibold">
                {order.jumlah_koin}
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h1 className="text-header text-lg text-white">CHANGE DETAIL</h1>

        <ChangeOrderDetail
          statusOrder={order.status}
          berat={order.berat}
          tanggal={order.tanggal}
        />
      </div>
    </div>
  );
};

export default OrderSampahDetails;
