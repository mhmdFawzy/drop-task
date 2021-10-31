import { memo } from "react";
import PropTypes from "prop-types";
import styles from "./Sidebar.module.scss";
import { v4 as uuidv4 } from "uuid";
import DragItem from "../DragItem";

const Sidebar = ({ listTitle, list, error, loading }) => {
  return (
    <div className={styles.sidebar}>
      <p className={styles.sidebarTitle}>{listTitle}</p>

      <ul className={styles.sidebarList}>
        {loading ? (
          <li className={`${styles.sidebarItem} ${styles.sidebarItemStatus}`}>
            loading...
          </li>
        ) : (
          <>
            {error && (
              <li
                className={`${styles.sidebarItem} ${styles.sidebarItemStatus}`}
              >
                {error}
              </li>
            )}
            {list &&
              list
                .sort((a, b) => (a.function > b.function ? 1 : -1))
                .map(({ name, function: type }) => {
                  return (
                    <DragItem
                      name={name}
                      type={type}
                      itemStyle={
                        type === "dimension"
                          ? `${styles.sidebarItem} ${styles.sidebarItemDimension}`
                          : `${styles.sidebarItem} ${styles.sidebarItemMeasure}`
                      }
                      key={uuidv4()}
                    />
                  );
                })}
          </>
        )}
      </ul>
    </div>
  );
};

Sidebar.propTypes = {
  listTitle: PropTypes.string.isRequired,
};

export default memo(Sidebar);
