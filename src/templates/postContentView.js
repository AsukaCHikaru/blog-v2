import React from 'react';
import { graphql } from 'gatsby';

import PostContentLayout from '../components/postContentLayout';
import SEO from '../components/seo';

export default function PostContentView({ data }) {
  const { markdownRemark } = data; // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark;
  const postMetadata = {
    title: frontmatter.title,
    date: frontmatter.date,
    tags: frontmatter.tags,
  };
  return (
    <PostContentLayout postMetadata={postMetadata}>
      <SEO title={frontmatter.title} />
      <div className="blog-post">
        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </PostContentLayout>
  );
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "YYYY-MM-DD")
        path
        title
        tags
      }
    }
  }
`;
