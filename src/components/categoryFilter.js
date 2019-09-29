import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';

const CategoryFilter = ({ category, selected }) => {
  const goalPath = category === 'all' ? '/' : `/category/${category}`;
  return (
    <Link to={goalPath}>
      <h3
        className={
          selected
            ? 'category-filter-txt category-selected'
            : 'category-filter-txt'
        }
      >
        {category.toUpperCase()}
      </h3>
    </Link>
  );
};

CategoryFilter.propTypes = {
  category: PropTypes.string,
};

CategoryFilter.defaultProps = {
  category: '',
};

export default CategoryFilter;
