import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import { Location } from '@reach/router';

import CategoryFilter from './categoryFilter';
import './header.css';

const Header = ({ siteTitle }) => (
  <Location>
    {({ location }) => (
      <header>
        <div className="header-title-wrapper">
          <h1 className="header-title-txt">
            <Link to="/">{siteTitle}</Link>
          </h1>
        </div>
        <div className="header-category-filter-container">
          <CategoryFilter category="all" selected={location.pathname === '/'} />
          <CategoryFilter
            category="gaming"
            selected={location.pathname === '/category/gaming'}
          />
          <CategoryFilter
            category="programming"
            selected={location.pathname === '/category/programming'}
          />
          <CategoryFilter
            category="others"
            selected={location.pathname === '/category/others'}
          />
        </div>
      </header>
    )}
  </Location>
);

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
