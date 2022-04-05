import { useState } from 'react';
import { v4 } from 'uuid';
import { ShoppingListItem } from './ShoppingListItem.js';
import './ShoppingList.css';

export const ShoppingList = () => {
  const [items, setItems] = useState([
    {
      id: v4(),
      name: '',
      count: 2,
    },
    {
      id: v4(),
      name: '',
      count: 5,
    },
  ]);

  const handleOnItemChange = (item) => {
    const index = items.findIndex((i) => i.id === item.id);
    items.splice(index, 1, item);
    const newItems = [...items];
    setItems(newItems);
  };

  const handleAddNewItem = () => {
    setItems([
      ...items,
      {
        id: v4(),
        name: '',
        count: 1,
      },
    ]);
  };

  const handleOnItemDelete = (item) => {
    const newItems = items.filter((i) => i.id !== item.id);
    setItems([...newItems]);
  };

  return (
    <div className="shopping-list">
      {items.map((item) => {
        return (
          <ShoppingListItem
            key={item.id}
            item={item}
            onItemChange={handleOnItemChange}
            onItemDelete={handleOnItemDelete}
          />
        );
      })}
      <button type="button" onClick={handleAddNewItem} className="btn-add">
        Add
      </button>
    </div>
  );
};
