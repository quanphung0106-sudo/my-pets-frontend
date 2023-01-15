import { useCallback } from "react";
import { itemApi, orderApi, userApi } from "~/libs/helpers/axios";
import storage from "../helpers/localStorage";

const { useEffect } = require("react");
const { useState } = require("react");

const useFetch = (params, id, user) => {
  const [data, setData] = useState([]);
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

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        switch (params) {
          case "items":
            const itemsRes = id
              ? await itemApi().get(id)
              : await itemApi().getAll();
            if (itemsRes.data) setData(itemsRes.data);
            break;
          case "orders":
            const ordersRes = await handleFetchOrders();
            if (ordersRes.data) setData(ordersRes.data);
            break;
          case "allOrders":
            const allOrdersRes = await orderApi(storage.getAccessToken()).getAll();
            if (allOrdersRes.data) setData(allOrdersRes.data);
            break;
          case "users":
            const userRes = await userApi(storage.getAccessToken()).getAll();
            if (userRes.data) setData(userRes.data);
            break;
          default:
            break;
        }
      } catch (err) {
        console.log(err);
        setError(err);
      }
      setLoading(false);
    };
    fetchData();
  }, [params, id, handleFetchOrders]);

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
