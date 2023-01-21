import { Stack, Typography } from "@mui/material";
import { motion, useAnimationControls } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import Pet from "~/assets/images/pet.png";
import Pets from "~/assets/images/pets.jpg";
import { BaseButton } from "../Button/Button";
import styles from "./Benefits.module.scss";

const Benefits = () => {
  const { ref, inView } = useInView();
  const animation = useAnimationControls();

  useEffect(() => {
    if (inView === true) {
      animation.start({
        opacity: 1,
        transition: {
          type: "spring",
          duration: 0.8,
          bounce: 0.3,
        },
      });
    } else {
      animation.start({
        opacity: 0,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <Stack ref={ref} className={styles.Container}>
      <motion.div animate={animation}>
        <Stack className={styles.Item}>
          <motion.div
            animate={{ width: inView ? "85rem" : "75rem" }}
            transition={
              inView && {
                duration: 0.8,
                delay: 0.2,
                ease: [0, 0.71, 0.2, 1.01],
                type: "spring",
                bounce: 0.3,
              }
            }
            className={styles.ImgWrapper}
          >
            <motion.img
              animate={
                inView ? { opacity: 1, scale: 1 } : { opacity: 0.5, scale: 0 }
              }
              transition={
                inView && {
                  duration: 0.8,
                  delay: 0.2,
                  ease: [0, 0.71, 0.2, 1.01],
                  type: "spring",
                  bounce: 0.3,
                }
              }
              src={Pet}
              alt="pet"
            />
          </motion.div>
        </Stack>
        <Stack className={styles.Item}>
          <Stack className={styles.ModalContainer}>
            <Stack
              component={motion.div}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0.5, x: 100 }}
              transition={
                inView && {
                  duration: 0.8,
                  delay: 0.2,
                  ease: [0, 0.71, 0.2, 1.01],
                }
              }
              className={styles.ModalWrapper}
            >
              <Typography variant="h1">Why Dogs Make You Happy</Typography>
              <Typography variant="body1">
                Quam nulla porttitor massa id neque aliquam vestibulum morbi. Eu
                consequat ac felis donec et odio pellentesque. Turpis nunc eget
                lorem dolor sed. Ornare quam viverra orci sagittis eu volutpat
                odio. Sed vulputate odio ut enim blandit volutpat.
              </Typography>
              <BaseButton ghost>READ MORE</BaseButton>
            </Stack>

            <Stack
              component={motion.div}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0.5, y: 100 }}
              transition={
                inView && {
                  duration: 0.8,
                  delay: 0.2,
                  ease: [0, 0.71, 0.2, 1.01],
                }
              }
              className={styles.TextWrapper}
            >
              <Typography variant="h1">Dogs improve your mood:</Typography>
              <ul>
                <li>Duis are iruhe dolor in</li>
                <li>Expepteur sint occaecat</li>
                <li>Utenim ad minim</li>
                <li>Lorem ipsum dolor</li>
              </ul>
            </Stack>
          </Stack>
        </Stack>
        <Stack className={styles.Item}>
          <motion.img
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={
              inView && {
                duration: 0.8,
                delay: 0.2,
                ease: [0, 0.71, 0.2, 1.01],
                type: "spring",
                bounce: 0.3,
              }
            }
            src={Pets}
            alt="pet"
          />
        </Stack>
      </motion.div>
    </Stack>
  );
};

export default Benefits;
