import { memo } from "react";
import { useDrop } from "react-dnd";
import PropTypes from "prop-types";

import styles from "./Filter.module.scss";
const Filter = ({ filters, setFilters, accept, lastDroppedItem, onDrop }) => {
  const [, drop] = useDrop({
    accept,
    drop: onDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });
  const handleClear = (clearFilter) => {
    const modifiedFilters = filters.map((filter) => {
      return filter.accepts[0] === clearFilter
        ? { ...filter, lastDroppedItem: [] }
        : filter;
    });
    setFilters(modifiedFilters);
  };
  return (
    <>
      <div className={styles.filter}>
        <span
          className={
            accept[0] === "measure"
              ? `${styles.filterTitle} ${styles.bgMeasure}`
              : `${styles.filterTitle} ${styles.bgDimension}`
          }
        >
          {accept[0] === "measure" ? "Measure" : "Dimension"}
        </span>
        <div
          ref={drop}
          className={
            accept[0] === "measure"
              ? `${styles.filterDrop} ${styles.bgMeasure}`
              : `${styles.filterDrop} ${styles.bgDimension}`
          }
        >
          {lastDroppedItem && <p> {lastDroppedItem.join(" - ")}</p>}
        </div>
        <button
          className={styles.clearFilter}
          onClick={() => handleClear(accept[0])}
        >
          clear {accept[0]}
        </button>
      </div>
    </>
  );
};
Filter.propTypes = {
  setFilters: PropTypes.func.isRequired,
  filters: PropTypes.array.isRequired,
  accept: PropTypes.array.isRequired,
  lastDroppedItem: PropTypes.array.isRequired,
  onDrop: PropTypes.func.isRequired,
};
export default memo(Filter);
