import { useCallback, useEffect, useState } from "react";
import { itemApi, orderApi, userApi } from "~/libs/helpers/axios";
import storage from "../helpers/localStorage";

const useFetch = (name, id, user, params) => {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleFetchOrders = useCallback(async () => {
    if (!user && id) return await orderApi().getNoUser(id);
    if (user) {
      if (id) return await orderApi(storage.getAccessToken()).get(id);
      if (!id)
        return await orderApi(storage.getAccessToken()).getByUserId(user._id);
    }
  }, [id, user]);

  const fetchData = async () => {
    setLoading(true);
    try {
      switch (name) {
        case "items":
          const itemsRes = id
            ? await itemApi().get(id)
            : await itemApi().getAll(params);
          if (itemsRes) {
            setData(itemsRes.data);
            setStatus(itemsRes.status);
          }
          if (itemsRes.status === 204) setData([]);
          break;
        case "orders":
          const ordersRes = await handleFetchOrders();
          if (ordersRes) {
            setData(ordersRes.data);
            setStatus(ordersRes.status);
          }
          if (ordersRes.status === 204) setData([]);
          break;
        case "allOrders":
          const allOrdersRes = await orderApi(
            storage.getAccessToken()
          ).getAll();
          if (allOrdersRes) {
            setData(allOrdersRes.data);
            setStatus(allOrdersRes.status);
          }
          if (allOrdersRes.status === 204) setData([]);
          break;
        case "users":
          const userRes = await userApi(storage.getAccessToken()).getAll();
          if (userRes) {
            setData(userRes.data);
            setStatus(userRes.status);
          }
          if (userRes.status === 204) setData([]);
          break;
        default:
          break;
      }
    } catch (err) {
      console.log(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [name, id, handleFetchOrders]);

  const reFetch = () => {
    fetchData();
  };

  return { data, status, loading, error, reFetch };
};

export default useFetch;
