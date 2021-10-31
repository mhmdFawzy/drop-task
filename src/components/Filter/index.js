import { useDrop } from "react-dnd";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";

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
  const handleRemove = (e, accept, removeItem) => {
    e.stopPropagation();
    setFilters((prevState) => {
      return {
        ...prevState,
        [accept]: {
          ...prevState[accept],
          lastDroppedItem: prevState[accept].lastDroppedItem.filter(
            (item) => item !== removeItem
          ),
        },
      };
    });
  };
  const handleClear = (e, clearFilter) => {
    e.stopPropagation();
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
          {/* {lastDroppedItem && <p> {lastDroppedItem.join(" - ")}</p>} */}
          {lastDroppedItem &&
            lastDroppedItem.map((item) => (
              <span className={styles.filterBtn} key={uuidv4()}>
                {item}
                {accept === "measure" && (
                  <Button
                    styles={styles.removeFilter}
                    clickHandler={(e) => handleRemove(e, accept, item)}
                    text={"X"}
                  />
                )}
              </span>
            ))}
        </div>
        <Button
          styles={styles.clearFilter}
          clickHandler={(e) => handleClear(e, accept)}
          text={`Clear ${accept}`}
        />
      </div>
    </>
  );
};
Filter.propTypes = {
  setFilters: PropTypes.func.isRequired,
  filters: PropTypes.object.isRequired,
  accept: PropTypes.string.isRequired,
  lastDroppedItem: PropTypes.array.isRequired,
  onDrop: PropTypes.func.isRequired,
};
export default Filter;
