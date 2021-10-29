import { memo } from "react";
import { useDrop } from "react-dnd";
import PropTypes from "prop-types";

import styles from "./Filter.module.scss";
const Filter = ({ accept, lastDroppedItem, onDrop }) => {
  const [, drop] = useDrop({
    accept,
    drop: onDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

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
          {lastDroppedItem && <p> {lastDroppedItem.join("-")}</p>}
        </div>
      </div>
    </>
  );
};
Filter.propTypes = {
  accept: PropTypes.array.isRequired,
  lastDroppedItem: PropTypes.array.isRequired,
  onDrop: PropTypes.func.isRequired,
};
export default memo(Filter);
