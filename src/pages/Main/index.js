import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import PropTypes from "prop-types";
import Container from "../../components/dndContainer";
import { functionTypes } from "../../utils/functionTypes";
import styles from "./Main.module.scss";

const Main = ({ columns, error, loading }) => {
  const [filters, setFilters] = useState([
    { accepts: functionTypes.DIMENSION, lastDroppedItem: [] },
    { accepts: functionTypes.MEASURE, lastDroppedItem: [] },
  ]);
  const [filtersFilled, setFiltersFilled] = useState(false);
  useEffect(() => {
    let filtersDragged = false;
    filters.forEach((filter) => {
      filtersDragged = filter.lastDroppedItem.length >= 1 ? true : false;
    });
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
        {filtersFilled && "chart"}
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
