import Button from '../Button';
import PropTypes from 'prop-types';
import { functionTypes } from '../../utils/functionTypes';
import styles from './Filter.module.scss';
import { useDrop } from 'react-dnd';
import { v4 as uuidv4 } from 'uuid';

const Filter = ({ setFilters, accept, lastDroppedItem, onDrop }) => {
  const [, drop] = useDrop({
    accept,
    drop: onDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });
  const handleRemove = (accept, removeItem) => {
    setFilters((prevState) => {
      return {
        ...prevState,
        [accept]: {
          ...prevState[accept],
          lastDroppedItem: prevState[accept].lastDroppedItem.filter((item) => item !== removeItem),
        },
      };
    });
  };
  const handleClear = (clearFilter) => {
    setFilters((prevState) => {
      return {
        ...prevState,
        [clearFilter]: {
          ...prevState[clearFilter],
          lastDroppedItem: [],
        },
      };
    });
  };
  return (
    <>
      <div className={styles.filter}>
        <span
          className={
            accept === functionTypes.MEASURE
              ? `${styles.filterTitle} ${styles.bgMeasure}`
              : `${styles.filterTitle} ${styles.bgDimension}`
          }>
          {accept === functionTypes.MEASURE ? 'Measure' : 'Dimension'}
        </span>
        <div
          ref={drop}
          className={
            accept === functionTypes.MEASURE
              ? `${styles.filterDrop} ${styles.bgMeasure}`
              : `${styles.filterDrop} ${styles.bgDimension}`
          }>
          {lastDroppedItem &&
            lastDroppedItem.map((item) => (
              <span className={styles.filterBtn} key={uuidv4()}>
                {item}
                {accept === functionTypes.MEASURE && (
                  <Button
                    styles={styles.removeFilter}
                    clickHandler={() => handleRemove(accept, item)}
                    text={'X'}
                  />
                )}
              </span>
            ))}
        </div>
        <Button
          styles={styles.clearFilter}
          clickHandler={() => handleClear(accept)}
          text={`Clear ${accept}`}
        />
      </div>
    </>
  );
};
Filter.propTypes = {
  setFilters: PropTypes.func.isRequired,
  accept: PropTypes.string.isRequired,
  lastDroppedItem: PropTypes.array.isRequired,
  onDrop: PropTypes.func.isRequired,
};
export default Filter;
