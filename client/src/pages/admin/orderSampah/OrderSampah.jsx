import { useEffect, useState } from "react";
import { fetchOrderSampah } from "../../../actions/adminAction";
import { Link } from "react-router-dom";
import Loading from "../../../components/Loading";

const OrderSampah = () => {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    (async function () {
      setLoading(true);

      const res = await fetchOrderSampah();

      // setOrders(res.result || []);

      setLoading(false);
    })();

    setOrders([
      {
        id: 1,
        id_pemesan: 2345,
        tanggal: "2024-06-01",
        status: "Picked Up",
        berat: 15,
      },
      {
        id: 2,
        id_pemesan: 8976,
        tanggal: "2024-06-02",
        status: "Pending",
        berat: 22,
      },
      {
        id: 3,
        id_pemesan: 4567,
        tanggal: "2024-05-30",
        status: "Completed",
        berat: 18,
      },
      {
        id: 4,
        id_pemesan: 1234,
        tanggal: "2024-06-03",
        status: "Picked Up",
        berat: 28,
      },
      {
        id: 5,
        id_pemesan: 9012,
        tanggal: "2024-06-04",
        status: "Pending",
        berat: 12,
      },
      {
        id: 6,
        id_pemesan: 3456,
        tanggal: "2024-05-28",
        status: "Completed",
        berat: 33,
      },
      {
        id: 7,
        id_pemesan: 7890,
        tanggal: "2024-06-01",
        status: "Picked Up",
        berat: 19,
      },
      {
        id: 8,
        id_pemesan: 6789,
        tanggal: "2024-06-02",
        status: "Pending",
        berat: 25,
      },
      {
        id: 9,
        id_pemesan: 2345,
        tanggal: "2024-05-31",
        status: "Completed",
        berat: 30,
      },
      {
        id: 10,
        id_pemesan: 5678,
        tanggal: "2024-06-03",
        status: "Picked Up",
        berat: 17,
      },
    ]);
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
            {order.tanggal}
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
