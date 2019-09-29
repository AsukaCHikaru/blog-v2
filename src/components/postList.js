import React from 'react';

import PostLink from './postLink';

const renderPost = data => {
  return data.map((post, i) => {
    return <PostLink post={post.node.frontmatter} key={`post-link-${i}`} />;
  });
};

export default function PostList({ postData }) {
  return <div className="post-list-container">{renderPost(postData)}</div>;
}
