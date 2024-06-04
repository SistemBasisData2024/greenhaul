import { useEffect, useState } from "react";
import { fetChOrderSampahDetails } from "../../../actions/adminAction";
import { useLocation } from "react-router-dom";

const OrderSampahDetails = () => {
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState({});

  const id = useLocation().pathname.split("/")[3];

  useEffect(() => {
    (async function () {
      setLoading(true);

      const res = await fetChOrderSampahDetails(id);

      setOrder(res.result || []);

      setLoading(false);
    })();
  }, []);

  return (
    <div>
      <h1>Order sampah</h1>
    </div>
  );
};

export default OrderSampahDetails;
