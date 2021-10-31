import Button from '../Button';
import PropTypes from 'prop-types';
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
            accept === 'measure'
              ? `${styles.filterTitle} ${styles.bgMeasure}`
              : `${styles.filterTitle} ${styles.bgDimension}`
          }>
          {accept === 'measure' ? 'Measure' : 'Dimension'}
        </span>
        <div
          ref={drop}
          className={
            accept === 'measure'
              ? `${styles.filterDrop} ${styles.bgMeasure}`
              : `${styles.filterDrop} ${styles.bgDimension}`
          }>
          {/* {lastDroppedItem && <p> {lastDroppedItem.join(" - ")}</p>} */}
          {lastDroppedItem &&
            lastDroppedItem.map((item) => (
              <span className={styles.filterBtn} key={uuidv4()}>
                {item}
                {accept === 'measure' && (
                  <Button
                    styles={styles.removeFilter}
                    clickHandler={(e) => handleRemove(accept, item)}
                    text={'X'}
                  />
                )}
              </span>
            ))}
        </div>
        <Button
          styles={styles.clearFilter}
          clickHandler={(e) => handleClear(accept)}
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
