import React from 'react';
import { graphql } from 'gatsby';

import PostContentLayout from '../components/postContentLayout';
import SEO from '../components/seo';
import { htmlConverter } from '../lib/htmlConverter';

export default function PostContentView({ data }) {
  const { markdownRemark } = data; // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark;
  const postMetadata = {
    title: frontmatter.title,
    date: frontmatter.date,
    tags: frontmatter.tags,
  };
  const convertedHTML = htmlConverter(html);
  return (
    <PostContentLayout postMetadata={postMetadata}>
      <SEO title={frontmatter.title} />
      <div
        className="post-wrapper"
        dangerouslySetInnerHTML={{ __html: convertedHTML }}
      />
    </PostContentLayout>
  );
}

export const pageQuery = graphql`
  query($path: String!, $slug: String) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "YYYY-MM-DD")
        path
        title
        tags
      }
    }
    allImageSharp(filter: { fluid: { originalName: { regex: $slug } } }) {
      edges {
        node {
          fluid(quality: 100) {
            originalImg
          }
        }
      }
    }
  }
`;
