import { ShoppingList } from './ShoppingList';
import ReactDOM from 'react-dom/client';
import './reset.css';
import './index.css';

const domContainer = document.querySelector('#app');
const root = ReactDOM.createRoot(domContainer);
root.render(<ShoppingList />);
