import { useEffect, useState } from "react";
import { fetchOrderSampah } from "../../../actions/adminAction";
import { Link } from "react-router-dom";
import Loading from "../../../components/Loading";
import { formatDate } from "../../../utils";

const OrderSampah = () => {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    (async function () {
      setLoading(true);

      const res = await fetchOrderSampah();

      setOrders(res.result || []);

      setLoading(false);
    })();
  }, []);

  return (
    <div className="px-8 min-h-screen">
      {loading && <Loading />}

      <div className="py-4 border-primary-green">
        <h1 className="text-header text-white">Order Sampah</h1>
      </div>

      <div className="grid grid-cols-4 text-white bg-primary-green border-[1px] border-primary-green">
        <h1 className="px-2 pb-1.5 pt-1 font-bold border-[1px] border-secondary-green">
          ID Pemesan
        </h1>

        <h1 className="px-2 pb-1.5 pt-1 font-bold border-[1px] border-secondary-green">
          Tanggal
        </h1>

        <h1 className="px-2 pb-1.5 pt-1 font-bold border-[1px] border-secondary-green">
          Status
        </h1>

        <h1 className="px-2 pb-1.5 pt-1 font-bold border-[1px] border-secondary-green">
          Berat (kg)
        </h1>
      </div>

      {orders.map((order, i) => (
        <Link
          key={i}
          to={"/admin/order-sampah/" + order.id}
          className="grid grid-cols-4"
        >
          <h1 className="px-2 pb-1.5 pt-1 border-[1px] border-primary-green">
            {order.id_pemesan}
          </h1>

          <h1 className="px-2 pb-1.5 pt-1 border-[1px] border-primary-green">
            {formatDate(new Date(order.tanggal))}
          </h1>

          <h1 className="px-2 pb-1.5 pt-1 border-[1px] border-primary-green">
            {order.status}
          </h1>

          <h1 className="px-2 pb-1.5 pt-1 border-[1px] border-primary-green">
            {order.berat}
          </h1>
        </Link>
      ))}
    </div>
  );
};

export default OrderSampah;
