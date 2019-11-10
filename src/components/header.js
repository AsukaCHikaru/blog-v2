import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import { Location } from '@reach/router';

import CategoryFilter from './categoryFilter';
import './header.css';

const Header = ({ siteTitle }) => (
  <Location>
    {({ location }) => {
      return (
        <header>
          <div className="header-title-wrapper">
            <h1 className="header-title-txt">
              <Link to="/">{siteTitle}</Link>
            </h1>
          </div>
          <div className="header-category-filter-container">
            <CategoryFilter category="all" selected={location.pathname === '/'}>
              {'ALL'}
            </CategoryFilter>
            <CategoryFilter
              category="gaming"
              selected={location.pathname === '/category/gaming'}
            >
              {'GAMING'}
            </CategoryFilter>
            <CategoryFilter
              category="programming"
              selected={location.pathname === '/category/programming'}
            >
              {'PROGRAMMING'}
            </CategoryFilter>
            <CategoryFilter
              category="others"
              selected={location.pathname === '/category/others'}
            >
              {'OTHERS'}
            </CategoryFilter>
            <CategoryFilter
              category="tag"
              selected={location.pathname.includes('/tag/')}
            >
              {decodeURIComponent(location.pathname.replace('/tag/', ''))}
            </CategoryFilter>
          </div>
        </header>
      );
    }}
  </Location>
);

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
