import React from 'react';
import { graphql } from 'gatsby';

import PostLink from '../components/postLink';
import Layout from '../components/layout';
import SEO from '../components/seo';

const renderPost = data => {
  return data.map((post, i) => {
    return <PostLink post={post.node.frontmatter} key={`post-link-${i}`} />;
  });
};

export default function PostList({ data }) {
  const posts = data.allMarkdownRemark.edges;
  return (
    <Layout>
      <SEO title="gaming" />
      <div className="post-list-container">{renderPost(posts)}</div>
    </Layout>
  );
}

export const pageQuery = graphql`
  query($category: String!) {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { category: { eq: $category } } }
    ) {
      edges {
        node {
          frontmatter {
            title
            date(formatString: "YYYY-MM-DD")
            path
            tags
            category
          }
        }
      }
    }
  }
`;
