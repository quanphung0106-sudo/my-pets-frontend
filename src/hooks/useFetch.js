import itemApi from "~/helpers/axios/itemApi";
import orderApi from "~/helpers/axios/orderApi";
import userApi from "~/helpers/axios/userApi";

const { useEffect } = require("react");
const { useState } = require("react");

const useFetch = (params) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        switch (params) {
          case "items":
            const itemsRes = await itemApi.getAll();
            if (itemsRes.data) setData(itemsRes.data);
            break;
          case "orders":
            const orderRes = await orderApi.getAll();
            if (orderRes.data) setData(orderRes.data);
            break;
          case "users":
            const userRes = await userApi.getAll();
            if (userRes.data) setData(userRes.data);
            break;
          default:
            break;
        }
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };
    fetchData();
  }, [params]);

  const reFetch = async () => {
    setLoading(true);
    try {
      //   const res = await callback();
      //   if (res.data) setData(res.data);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  return { data, loading, error, reFetch };
};

export default useFetch;