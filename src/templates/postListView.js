import React from 'react';
import { graphql } from 'gatsby';

import PostList from '../components/postList';
import Layout from '../components/layout';
import SEO from '../components/seo';

export default function PostListView({ data, pageContext }) {
  const categoryOrTag = pageContext.category || pageContext.tag;
  const postData = data.allMarkdownRemark.edges.filter(
    node =>
      node.node.frontmatter.category === categoryOrTag ||
      (node.node.frontmatter.tags !== null &&
        node.node.frontmatter.tags.split(', ').includes(categoryOrTag))
  );
  return (
    <Layout>
      <SEO title={data.site.siteMetadata.title} />
      <PostList postData={postData} />
    </Layout>
  );
}

export const pageQuery = graphql`
  query {
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
    site {
      siteMetadata {
        title
      }
    }
  }
`;
