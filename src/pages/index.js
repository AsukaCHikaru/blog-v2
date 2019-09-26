import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';

const renderPost = data => {
  return data.map(post => {
    return <p>{post.node.frontmatter.title}</p>;
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
            date
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
