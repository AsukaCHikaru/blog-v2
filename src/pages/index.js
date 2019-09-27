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

const IndexPage = ({ data }) => {
  const posts = data.allMarkdownRemark.edges;
  return (
    <Layout>
      <SEO title="Home" />
      {renderPost(posts)}
    </Layout>
  );
};

export const posts = graphql`
  query queryPostsAll {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
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

export default IndexPage;
