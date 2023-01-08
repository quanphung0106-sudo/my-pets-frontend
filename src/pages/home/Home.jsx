import Advantages from '~/components/Advantages/Advantages';
import Benefits from '~/components/Benefits/Benefits';
import Contact from '~/components/Contact/Contact';
import Featured from '~/components/Featured/Featured';
import ScrollToTop from '~/components/scroll/Scroll';
import ListData from '~/components/ListData/ListData';

const Home = () => {
  return (
    <>
      <ScrollToTop />
      <Featured />
      <Benefits />
      <ListData />
      <Advantages />
      <Contact />
    </>
  );
};

export default Home;
