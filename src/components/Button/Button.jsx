import { Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from './Button.module.scss';

const cx = classNames.bind(styles);

export const BaseButton = (props) => {
  const { className, primary = false, ghost = false, text = false, to, children, ...others } = props;

  const classesCustom = cx('', {
    [className]: className,
    primary,
    ghost,
    text,
  });

  return (
    <Box component={props.to ? Link : 'div'} to={props.to && props.to} className={styles.Href}>
      <Button
        className={classesCustom}
        variant="contained"
        classes={{
          root: styles.BaseButton,
          sizeMedium: styles.SizeMedium,
          sizeSmall: styles.SizeSmall,
          sizeLarge: styles.SizeLarge,
          disabled: styles.Disabled,
        }}
        {...others}
      >
        {children}
      </Button>
    </Box>
  );
};

BaseButton.prototype = {
  className: PropTypes.string,
  primary: PropTypes.bool,
  ghost: PropTypes.bool,
  size: PropTypes.string,
  to: PropTypes.string,
  variant: PropTypes.bool,
  children: PropTypes.node.isRequired,
  classes: PropTypes.object,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};
