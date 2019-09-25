import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';

import Header from './header';
import './layout.css';

const mainLayoutStyle = {
  margin: `0 auto`,
  maxWidth: 960,
  padding: `0px 1.0875rem 1.45rem`,
  paddingTop: 0,
};

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <div style={mainLayoutStyle}>
      <Header siteTitle={data.site.siteMetadata.title} />
      <div>
        <main>{children}</main>
        <footer>
          © 2019{' '}
          <a
            href="https://asukachikaru.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            asukachikaru.com
          </a>
        </footer>
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
