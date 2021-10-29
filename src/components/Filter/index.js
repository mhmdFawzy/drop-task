import { memo } from "react";
import { useDrop } from "react-dnd";
import PropTypes from "prop-types";

import styles from "./Filter.module.scss";
import Button from "../Button";
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
      return filter.accepts === clearFilter
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
            accept === "measure"
              ? `${styles.filterTitle} ${styles.bgMeasure}`
              : `${styles.filterTitle} ${styles.bgDimension}`
          }
        >
          {accept === "measure" ? "Measure" : "Dimension"}
        </span>
        <div
          ref={drop}
          className={
            accept === "measure"
              ? `${styles.filterDrop} ${styles.bgMeasure}`
              : `${styles.filterDrop} ${styles.bgDimension}`
          }
        >
          {lastDroppedItem && <p> {lastDroppedItem.join(" - ")}</p>}
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
  filters: PropTypes.array.isRequired,
  accept: PropTypes.string.isRequired,
  lastDroppedItem: PropTypes.array.isRequired,
  onDrop: PropTypes.func.isRequired,
};
export default memo(Filter);
