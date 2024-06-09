import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import CreateOrder from "../../components/CreateOrder";
import { getOrderSampah } from "../../actions/userActions";
import { formatDate } from "../../utils";

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const getSampah = async () => {
    setLoading(true);
    const d = await getOrderSampah();

    if (!d) {
      setLoading(false);
      return;
    }

    setOrders(d);
    setLoading(false);
  };

  useEffect(() => {
    getSampah();
  }, []);

  return (
    <div className="px-8 min-h-screen">
      {loading && <Loading />}

      <div className="py-4 border-primary-green w-full flex items-center justify-between">
        <h1 className="text-xl text-primary-green font-black">Order Sampah</h1>

        <CreateOrder onOrderCreated={() => getSampah()} />
      </div>

      <div className="grid grid-cols-3 text-white bg-primary-green border-[1px] border-primary-green">
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

      {orders.length === 0 ? (
        <div className="text-center text-primary-green font-bold text-lg mt-8">
          No orders found.
        </div>
      ) : (
        orders.map((order, i) => (
          <div
            key={i}
            className="grid grid-cols-3 cursor-pointer hover:bg-primary-green/20"
            onClick={() => navigate(`/order-detail/${order.id}`)}
          >
            <h1 className="px-2 pb-1.5 pt-1 border-[1px] border-primary-green text-lg">
              {formatDate(new Date(order.tanggal))}
            </h1>

            <h1 className="px-2 pb-1.5 pt-1 border-[1px] border-primary-green text-lg">
              {order.status}
            </h1>

            <h1 className="px-2 pb-1.5 pt-1 border-[1px] border-primary-green text-lg">
              {order.berat} kg
            </h1>
          </div>
        ))
      )}
    </div>
  );
};

export default Dashboard;