import PropTypes from 'prop-types';
import { memo } from 'react';

const Button = ({ styles, clickHandler, text }) => {
  return (
    <button className={styles} onClick={clickHandler}>
      {text}
    </button>
  );
};

Button.propTypes = {
  styles: PropTypes.string.isRequired,
  clickHandler: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired
};

export default memo(Button);
