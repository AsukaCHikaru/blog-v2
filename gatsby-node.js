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
              tags
            }
          }
        }
      }
    }
  `);
  if (postContextQueryResult.errors) {
    console.error(postContextQueryResult.errors);
  }

  const tags = postContextQueryResult.data.allMarkdownRemark.edges
    .filter(node => node.node.frontmatter.tags !== null)
    .map(node => {
      return node.node.frontmatter.tags.split(', ');
    })
    .reduce((acc, curr) => {
      curr.forEach(tag => {
        if (!acc.includes(tag)) acc.push(tag);
      });
      return acc;
    }, []);

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
      component: path.resolve(`src/templates/postListView.js`),
      context: {
        category: category,
      },
    });
  });

  tags.forEach(tag => {
    createPage({
      path: `/tag/${tag.toLowerCase()}`,
      component: path.resolve(`src/templates/postListView.js`),
      context: {
        tag: tag,
      },
    });
  });
};
