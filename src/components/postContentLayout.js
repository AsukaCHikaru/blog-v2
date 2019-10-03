import React from 'react';
import PropTypes from 'prop-types';

import PostContentHeader from './postContentHeader';
import Footer from './footer';
import './postContent.css';

const PostContentLayout = ({ children, postMetadata }) => {
  return (
    <div className="post-content-container">
      <PostContentHeader postMetadata={postMetadata} />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

PostContentLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PostContentLayout;
