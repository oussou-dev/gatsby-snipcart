const path = require ('path')

// Implement the Gatsby API “createPages”. This is called once the
// data layer is bootstrapped to let plugins create pages from data.
exports.createPages = ({ boundActionCreators, graphql }) => {
    const { createPage } = boundActionCreators;

    return new Promise((resolve, reject) => {
        // Query for markdown nodes to use in creating pages.
        resolve(
            graphql(
                `
                {
                    allMarkdownRemark {
                        edges {
                            node {
                                frontmatter {
                                    type
                                    slug
                                }
                            }
                        }
                    }
                }
                `
            ).then(result => {
                if (result.errors) {
                    reject(result.errors);
                }
            
                // Create pages for each markdown file
                result.data.allMarkdownRemark.edges.forEach(({ node }) => {
                    const { slug, type } = node.frontmatter
                    
                    const homeTemplate = path.resolve('./src/templates/home.js')
                    const bookTemplate = path.resolve('./src/templates/book.js')

                    let template
                    if (type == 'home') {
                        template = homeTemplate
                    } else if (type == 'book') {
                        template = bookTemplate
                    }

                    createPage({
                        path: slug,
                        component: template,
                        context: {
                            slug
                        }
                    });
                });
            })
        );
    });
};