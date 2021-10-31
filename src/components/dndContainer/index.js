import { useCallback } from "react";
import Filter from "../Filter";
import { functionTypes } from "../../utils/functionTypes";
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";

import styles from "./Dndcontainer.module.scss";
const Container = ({ filters, setFilters }) => {
  const handleDrop = useCallback(
    (item, accepts) => {
      const { name } = item;
      if (accepts === functionTypes.MEASURE) {
        setFilters((prevState) => {
          return {
            ...prevState,
            [accepts]: {
              ...prevState[accepts],
              lastDroppedItem: [
                ...new Set([...prevState[accepts].lastDroppedItem, name]),
              ],
            },
          };
        });
      } else {
        setFilters((prevState) => {
          return {
            ...prevState,
            [accepts]: {
              ...prevState[accepts],
              lastDroppedItem: [name],
            },
          };
        });
      }
    },
    [setFilters]
  );

  return (
    <div className={styles.dndContainer}>
      {Object.entries(filters).map(([, value]) => (
        <Filter
          setFilters={setFilters}
          filters={filters}
          accept={value.accepts}
          lastDroppedItem={value.lastDroppedItem}
          onDrop={(item) => handleDrop(item, value.accepts)}
          key={uuidv4()}
        />
      ))}
    </div>
  );
};
Container.propTypes = {
  filters: PropTypes.object.isRequired,
  setFilters: PropTypes.func.isRequired,
};
export default Container;
