import Filter from '../Filter';
import PropTypes from 'prop-types';
import { functionTypes } from '../../utils/functionTypes';
import styles from './Dndcontainer.module.scss';
import { useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

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
  setFilters: PropTypes.func.isRequired,
  filters: PropTypes.object.isRequired,
};
export default Container;
