import React from 'react';
import FilterLink from './FilterLink';

const Footer = () => (
  <p>
    Show:
    {' '}
    <FilterLink
      filter={'all'}
    >all</FilterLink>
    {' '}
    <FilterLink
      filter={'completed'}
    >completed</FilterLink>
    {' '}
    <FilterLink
      filter={'active'}
    >active</FilterLink>
  </p>
);

export default Footer;