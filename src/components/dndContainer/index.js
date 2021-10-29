import { useCallback, memo } from "react";
import Filter from "../Filter";
import { functionTypes } from "../../utils/functionTypes";
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";

import styles from "./Dndcontainer.module.scss";
const Container = ({ filters, setFilters }) => {
  const handleDrop = useCallback(
    (index, item, accepts) => {
      const { name } = item;
      const updatedFilters = [...filters];
      if (accepts === functionTypes.MEASURE) {
        updatedFilters[index] = {
          ...updatedFilters[index],
          lastDroppedItem: [
            ...new Set([...updatedFilters[index].lastDroppedItem, name]),
          ],
        };
        setFilters(updatedFilters);
      } else {
        updatedFilters[index] = {
          ...updatedFilters[index],
          lastDroppedItem: [name],
        };
        setFilters(updatedFilters);
      }
    },
    [filters]
  );
  return (
    <div className={styles.dndContainer}>
      {filters.map(({ accepts, lastDroppedItem }, index) => (
        <Filter
          setFilters={setFilters}
          filters={filters}
          accept={accepts}
          lastDroppedItem={lastDroppedItem}
          onDrop={(item) => handleDrop(index, item, accepts)}
          key={uuidv4()}
        />
      ))}
    </div>
  );
};

Container.propTypes = {
  filters: PropTypes.array.isRequired,
  setFilters: PropTypes.func.isRequired,
};
export default memo(Container);
