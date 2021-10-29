import React from "react";
import Sidebar from "../../components/Sidebar";
import PropTypes from "prop-types";
import Container from "../../components/dndContainer";
import styles from "./Main.module.scss";
const Main = ({ columns, error, loading }) => {
  return (
    <div>
      <Sidebar
        listTitle="Columns"
        list={columns}
        error={error}
        loading={loading}
      />
      <div className={styles.content}>
        <Container />
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
