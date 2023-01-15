import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import Grid from "@mui/material/Unstable_Grid2";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./ItemDetail.module.scss";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Box, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import useFetch from "~/libs/hooks/useFetch";
import { addProduct } from "~/redux/cartSlice";
import { BaseButton } from "../Button/Button";
import Loading from "../Loading/Loading";

const ItemDetail = () => {
  const [quantity, setQuantity] = useState(1);
  const [check, setCheck] = useState({});
  const [price, setPrice] = useState(0);
  const [blockAdd, setBlockAdd] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const { data, loading } = useFetch("items", params.id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleOnchange = (e) => {
    let data = e.target.value;
    let toNum = +data;
    if (toNum <= 20) {
      setQuantity(toNum);
    }
  };

  const handleQuantity = (count) => {
    if (quantity >= 2 && count === "left") {
      let number = quantity - 1;
      setQuantity(number);
    } else if (quantity < 20 && count === "right") {
      let number = quantity + 1;
      setQuantity(number);
    }
  };

  const handleChecked = (option) => {
    setCheck(option);
    setBlockAdd(false);
    if (data.sellItem !== 0) {
      const sellPrice = option.price - (option.price * data.sellItem) / 100;
      setPrice(sellPrice);
    } else {
      setPrice(option.price);
    }
  };

  const handleClick = () => {
    dispatch(
      addProduct({
        idItem: uuidv4(),
        ...data,
        price,
        quantity,
        check,
        total: quantity * price,
      })
    );
  };

  if (loading) return <Loading />;
  return (
    <Grid container className={styles.Container}>
      <Grid className={styles.Left} xs={12} sm={6} lg={6}>
        <BaseButton
          onClick={() => navigate(-1)}
          primary
          startIcon={<ArrowBackOutlinedIcon />}
        >
          Go back
        </BaseButton>
        <Box component="img" src={data.img} alt="detailItem" />
      </Grid>
      <Grid className={styles.Right} xs={12} sm={6} lg={6}>
        <Box className={styles.Texts}>
          <Typography variant="h1">{data.title}</Typography>
          <Box className={styles.Prices}>
            {data.sellItem !== 0 ? (
              <>
                <Typography variant="body1">-{data.sellItem}%</Typography>$
                {price}
                <del className={styles.Price}>${price}</del>
              </>
            ) : (
              <>${price}</>
            )}
          </Box>
          <Typography variant="body1">{data.desc}</Typography>
          <Box className={styles.Quantity}>
            <button
              onClick={() => handleQuantity("left")}
              className={styles.AdjustQuantity}
            >
              -
            </button>
            <input
              type="number"
              onChange={handleOnchange}
              className={styles.Numbers}
              value={quantity}
            />
            <button
              onClick={() => handleQuantity("right")}
              className={styles.AdjustQuantity}
            >
              +
            </button>
            <Typography variant="body1">20 products are available</Typography>
          </Box>
          <section className={styles.Types}>
            {data.typeOfOptions?.map((option) => (
              <Box className={styles.Extras} key={option._id}>
                <input
                  onChange={() => handleChecked(option)}
                  type="checkbox"
                  checked={check._id === option._id}
                  id={option._id}
                  className={styles.Options}
                ></input>
                <Box component="label" htmlFor={option._id}>
                  {option.title}
                </Box>
              </Box>
            ))}
          </section>
          <Box className={styles.Payment}>
            <BaseButton
              startIcon={<ShoppingCartIcon />}
              ghost
              disabled={blockAdd}
              onClick={handleClick}
            >
              Add to cart
            </BaseButton>
            <BaseButton disabled={blockAdd} primary>
              Buy now!
            </BaseButton>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ItemDetail;
