import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';

const CategoryFilter = ({ category, selected, children }) => {
  const goalPath = category === 'all' ? '/' : `/category/${category}`;
  return (
    <Link to={goalPath}>
      <h3
        className={
          category === 'tag' && !selected
            ? 'category-filter-txt category-hided'
            : selected
            ? 'category-filter-txt category-selected'
            : 'category-filter-txt'
        }
      >
        {category === 'tag'
          ? `#${children.toUpperCase().replace(/-/g, ' ')}`
          : children.toUpperCase()}
      </h3>
    </Link>
  );
};

CategoryFilter.propTypes = {
  category: PropTypes.string,
  selected: PropTypes.bool,
};

CategoryFilter.defaultProps = {
  category: '',
  selected: false,
};

export default CategoryFilter;
