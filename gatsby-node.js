/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require(`path`);

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;

  const postContextQueryResult = await graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              path
            }
          }
        }
      }
    }
  `);
  if (postContextQueryResult.errors) {
    console.error(postContextQueryResult.errors);
  }

  const categories = ['all', 'gaming', 'programming', 'others'];

  postContextQueryResult.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.frontmatter.path,
      component: path.resolve(`src/templates/post.js`),
    });
  });

  categories.forEach(category => {
    createPage({
      path: `/category/${category}`,
      component: path.resolve(`src/templates/postList.js`),
      context: {
        category: category,
      },
    });
  });
};
