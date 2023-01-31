import Advantages from "~/components/Advantages/Advantages";
import Benefits from "~/components/Benefits/Benefits";
import Contact from "~/components/Contact/Contact";
import Featured from "~/components/Featured/Featured";
import ScrollToTop from "~/components/scroll/Scroll";
import ListData from "~/components/ListData/ListData";
import { useMediaQuery, useTheme } from "@mui/material";

const Home = () => {
  const theme = useTheme();
  const upLg = useMediaQuery(theme.breakpoints.up("lg"));
  return (
    <>
      <ScrollToTop />
      {upLg && (
        <>
          <Featured />
          <Benefits />
        </>
      )}
      <ListData />
      <Advantages />
      <Contact />
    </>
  );
};

export default Home;
