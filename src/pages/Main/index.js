import Sidebar from "../../components/Sidebar";
import { useState, useEffect } from "react";
import MultiAxisLine from "../../components/Chart";

import PropTypes from "prop-types";
import Container from "../../components/dndContainer";
import styles from "./Main.module.scss";
import { functionTypes } from "../../utils/functionTypes";

const Main = ({ columns, error, loading }) => {
  const [filters, setFilters] = useState({
    [functionTypes.DIMENSION]: {
      accepts: functionTypes.DIMENSION,
      lastDroppedItem: [],
    },
    [functionTypes.MEASURE]: {
      accepts: functionTypes.MEASURE,
      lastDroppedItem: [],
    },
  });
  const [filtersFilled, setFiltersFilled] = useState(false);
  useEffect(() => {
    let filtersDragged = false;
    for (const filter in filters) {
      if (filters[filter].lastDroppedItem.length >= 1) {
        filtersDragged = true;
      } else {
        filtersDragged = false;
        break;
      }
    }

    setFiltersFilled(filtersDragged);
  }, [filters]);
  return (
    <div>
      <Sidebar
        listTitle="Columns"
        list={columns}
        error={error}
        loading={loading}
      />
      <div className={styles.content}>
        <Container filters={filters} setFilters={setFilters} />
        {filtersFilled && <MultiAxisLine filters={filters} />}
      </div>
    </div>
  );
};

Main.propTypes = {
  columns: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default Main;
