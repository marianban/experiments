import React from 'react';
import Link from '../components/Link';
import { useRecoilState } from 'recoil';
import { filterAtom } from '../atoms/filter';

const FilterLink = (props) => {
  const [filter, setFilter] = useRecoilState(filterAtom);
  const active = props.filter === filter;
  return (
    <Link active={active} setFilter={() => setFilter(props.filter)}>
      {props.children}
    </Link>
  );
};

export default FilterLink;
