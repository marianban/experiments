import React from 'react';
import Link from '../components/Link';
import { useGlobalState } from '../useGlobalState';
import { store } from '../store';

const FilterLink = (props) => {
  const [filter, setFilter] = useGlobalState(store.filter);
  const active = props.filter === filter;
  return (
    <Link active={active} setFilter={() => setFilter(() => props.filter)}>
      {props.children}
    </Link>
  );
};

export default FilterLink;
