import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';

import '../styles/postLink.css';

const renderTags = tags => {
  const tagNodes =
    tags === null
      ? null
      : tags.split(/,\s*/)
          .map((tag, i) => {
            const tagPath = `/tag/${tag
              .toLowerCase()
              .replace(/\s/g, '-')}`;
            return (
              <Link to={tagPath} key={`post-link-tag-${i}`}>
                <h5 className="post-link-tag-txt">{`#${tag}`}</h5>{' '}
              </Link>
            );
          });
  return <div className="post-link-tag-container">{tagNodes}</div>;
};

const PostLink = ({ post }) => {
  return (
    <div className="post-link-container">
      <div className="post-link-title-wrapper">
        <Link to={post.path}>
          <h3 className="post-link-title-txt">{post.title}</h3>
        </Link>
      </div>
      <h4 className="post-link-date-txt">{post.date}</h4>
      {renderTags(post.tags)}
    </div>
  );
};

PostLink.defaultProps = {};

PostLink.propTypes = {
  post: PropTypes.object,
};

export default PostLink;
