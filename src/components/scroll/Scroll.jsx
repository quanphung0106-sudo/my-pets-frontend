import React, { useState, useEffect } from 'react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import styles from './Scroll.module.scss';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
    });
  };

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 500) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    window.addEventListener('scroll', toggleVisibility);

    //Cleanup function
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      {visible && (
        <ArrowBackIosNewIcon onClick={scrollToTop} className={styles.Scroll} style={{ width: 45, height: 45 }} />
      )}
    </>
  );
};

export default ScrollToTop;
