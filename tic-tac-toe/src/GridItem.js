import './GridItem.css';

export const GridItem = ({ value, onClick, x, y }) => {
  const handleOnClick = () => {
    onClick(x, y);
  };

  return (
    <div
      className="grid-item"
      data-x={x}
      data-y={y}
      data-value={value}
      onClick={handleOnClick}
    ></div>
  );
};
