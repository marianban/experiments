export const ShoppingListItem = ({ item, onItemChange, onItemDelete }) => {
  const handleOnChange = (event) => {
    const value =
      event.target.type === 'number'
        ? event.target.valueAsNumber
        : event.target.value;

    onItemChange({
      ...item,
      [event.target.name]: value,
    });
  };

  const handleOnDelete = () => {
    onItemDelete(item);
  };

  return (
    <div className="shopping-list__item">
      <label>
        Name
        <input
          type="text"
          name="name"
          value={item.name}
          onChange={handleOnChange}
          autoFocus
        ></input>
      </label>
      <label>
        Count
        <input
          type="number"
          name="count"
          min={1}
          value={item.count}
          onChange={handleOnChange}
        ></input>
      </label>
      <button type="button" onClick={handleOnDelete}>
        Delete
      </button>
    </div>
  );
};
