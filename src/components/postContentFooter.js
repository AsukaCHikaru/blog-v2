import React from 'react';
import { Link } from '@reach/router';

const PostContentFooter = ({ siteTitle }) => (
  <footer>
    <Link to="/" className="footer--link_title">
      {siteTitle}
    </Link>
    <div className="footer--link_container">
      <Link to="/category/gaming" className="footer--link">
        GAMING
      </Link>
      <Link to="/category/programming" className="footer--link">
        PROGRAMMING
      </Link>
      <Link to="/category/others" className="footer--link">
        OTHERS
      </Link>
    </div>
    <div className="footer--link_container">
      © {new Date().getFullYear()}{' '}
      <a
        className="footer--link"
        href="https://asukachikaru.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        asukachikaru.com
      </a>
    </div>
  </footer>
);

export default PostContentFooter;
