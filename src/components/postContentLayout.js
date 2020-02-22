import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';

import PostContentHeader from './postContentHeader';
import '../styles/postContent.css';
import PostContentFooter from './postContentFooter';

const PostContentLayout = ({ children, postMetadata }) => {
  const data = useStaticQuery(graphql`
    query footerSiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);
  return (
    <div className="post-content-container">
      <PostContentHeader postMetadata={postMetadata} />
      <main>{children}</main>
      <PostContentFooter siteTitle={data.site.siteMetadata.title} />
    </div>
  );
};

PostContentLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PostContentLayout;
