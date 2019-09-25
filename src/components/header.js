import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';

import CategoryFilter from './categoryFilter';
import './header.css';

const Header = ({ siteTitle }) => (
  <header>
    <div className="header-title-wrapper">
      <h1 className="header-title-txt">
        <Link to="/">{siteTitle}</Link>
      </h1>
    </div>
    <div className="header-category-filter-container">
      <CategoryFilter category="all" />
      <CategoryFilter category="gaming" />
      <CategoryFilter category="programming" />
      <CategoryFilter category="others" />
    </div>
  </header>
);

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
