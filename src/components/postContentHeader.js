import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';

import './header.css';

const renderTags = tags => {
  const tagsArray = tags === null ? [] : tags.split(', ');
  return tagsArray.map((tag, i) => {
    return (
      <Link to={`/tag/${tag.toLowerCase()}`} key={`post-tag-${i}`}>
        <h3 className="post-tag-txt">{`#${tag}`}</h3>
      </Link>
    );
  });
};

const Header = ({ postMetadata }) => (
  <header>
    <h1 className="post-title-txt">{postMetadata.title}</h1>
    <h3 className="post-date-txt">{postMetadata.date}</h3>
    <div className="post-tags-container">{renderTags(postMetadata.tags)}</div>
  </header>
);

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
