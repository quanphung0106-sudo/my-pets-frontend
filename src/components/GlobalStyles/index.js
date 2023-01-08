import PropTypes from 'prop-types';
import './GlobalStyles.scss';

const GlobalStyles = ({ children }) => {
  return children;
};

GlobalStyles.protoTypes = {
  children: PropTypes.node.isRequired,
};

export default GlobalStyles;
