import { useState, useCallback, memo } from "react";
import Filter from "../Filter";
import { functionTypes } from "../../utils/functionTypes";
import { v4 as uuidv4 } from "uuid";

import styles from "./Dndcontainer.module.scss";
const Container = () => {
  const [filters, setFilters] = useState([
    { accepts: [functionTypes.DIMENSION], lastDroppedItem: [] },
    { accepts: [functionTypes.MEASURE], lastDroppedItem: [] },
  ]);

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
          onDrop={(item) => handleDrop(index, item, accepts[0])}
          key={uuidv4()}
        />
      ))}
    </div>
  );
};

export default memo(Container);
