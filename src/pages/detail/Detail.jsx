import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Stack, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import Lightbox from "yet-another-react-lightbox";
import Inline from "yet-another-react-lightbox/plugins/inline";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import useFetch from "~/libs/hooks/useFetch";
import { addProduct } from "~/redux/cartSlice";
import Loading from "~/components/Loading/Loading";
import { BaseButton } from "~/components/Button/Button";
import styles from "./Detail.module.scss";

const Detail = () => {
  const [quantity, setQuantity] = useState(1);
  const [check, setCheck] = useState({});
  const [price, setPrice] = useState(0);
  const [blockAdd, setBlockAdd] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const { data, loading } = useFetch("items", params.id);
  const [open, setOpen] = useState(false);

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

  const source = [
    {
      src: data?.img,
    },
    {
      src: "https://img.freepik.com/free-photo/sleeping-beagle-dog-puppy-blue-background_1150-18196.jpg?w=1380&t=st=1674202953~exp=1674203553~hmac=31beac34ed4989db62b9811adfe9a4a6b204dafe21da6bc4363d909313a7647d",
    },
    {
      src: "https://img.freepik.com/free-photo/close-up-veterinarian-taking-care-dog_23-2149100179.jpg?t=st=1674202953~exp=1674203553~hmac=be95a56d3cac30b20dbae7863bc70889832f94b45f89550348b0a56845533d18",
    },
  ];

  if (loading) return <Loading />;
  return (
    <Stack
      direction={{ sm: "column", lg: "row" }}
      alignItems="flex-start"
      justifyContent="center"
      className={styles.Container}
    >
      <Stack
        justifyContent={{ sm: "flex-end", lg: "flex-start" }}
        gap="20px"
        flex="1"
        className={styles.Left}
      >
        <BaseButton
          onClick={() => navigate(-1)}
          primary
          startIcon={<ArrowBackOutlinedIcon />}
        >
          Go back
        </BaseButton>
        <Lightbox
          open={open}
          plugins={[Thumbnails, Inline]}
          className={styles.LightBox}
          thumbnails={{
            position: "bottom",
            width: 60,
            height: 60,
            border: 1,
            borderRadius: 4,
            padding: 0,
            gap: 8,
            imageFit: "cover",
            vignette: false,
          }}
          close={() => setOpen(false)}
          carousel={{ imageFit: "cover" }}
          animation={{ fade: 300, swipe: 300 }}
          slides={source}
        />
      </Stack>
      <Stack
        direction="row"
        alignItems="center"
        flex="1"
        className={styles.Right}
        sx={{ p: { sm: 0, lg: "5rem" }, pt: { sm: "20px", lg: "6.2rem" } }}
      >
        <Stack gap={{ sm: "20px", lg: "25px" }} className={styles.Texts}>
          <Typography variant="h1">{data.title}</Typography>
          <Stack className={styles.Prices}>
            {data.sellItem !== 0 ? (
              <Stack>
                <Typography variant="body1" className={styles.SellPrice}>
                  -{data.sellItem}%
                </Typography>
                <Stack className={styles.Price} direction="row">
                  <Typography>${price}</Typography>
                  <del>${price}</del>
                </Stack>
              </Stack>
            ) : (
              <>${price}</>
            )}
          </Stack>
          <Typography variant="body1">{data.desc}</Typography>
          <Stack
            direction="row"
            alignItems="center"
            className={styles.Quantity}
          >
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
          </Stack>
          <Stack component="section" direction="row" className={styles.Types}>
            {data.typeOfOptions?.map((option) => (
              <Stack
                direction="row"
                alignItems="center"
                className={styles.Extras}
                key={option._id}
              >
                <input
                  onChange={() => handleChecked(option)}
                  type="checkbox"
                  checked={check._id === option._id}
                  id={option._id}
                  className={styles.Options}
                ></input>
                <Stack component="label" htmlFor={option._id}>
                  {option.title}
                </Stack>
              </Stack>
            ))}
          </Stack>
          <Stack direction="row" gap="15px" className={styles.Payment}>
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
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Detail;
