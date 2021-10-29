import { memo } from "react";
import { useDrag } from "react-dnd";
import PropTypes from "prop-types";

const DragItem = ({ name, type, itemStyle }) => {
  const [{ opacity }, drag] = useDrag(
    () => ({
      type,
      item: { name },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.4 : 1,
      }),
    }),
    [name, type]
  );
  return (
    <li ref={drag} className={itemStyle} style={{ opacity }}>
      {name}
    </li>
  );
};
DragItem.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  itemStyle: PropTypes.string.isRequired,
};
export default memo(DragItem);
