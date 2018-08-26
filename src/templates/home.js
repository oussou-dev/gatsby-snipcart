import React from 'react'
import Link from 'gatsby-link'

export default ({data}) => {
    const html = data.markdownRemark.html
    const books = data.books.edges
    console.log(data.books)

    return (
        <div>
            <h1>Accueil</h1>
            <div dangerouslySetInnerHTML={{__html: html }}></div>
            {
                books.map(({ node }) => {
                    const { title, description, slug } = node.frontmatter
                    return ( 
                        <div key={title}>
                            <h4>
                                <Link to={slug}>
                                    {title}
                                </Link>
                            </h4>
                            <p>{description}</p>
                        </div>
                    )
                })
            }
        </div>
    )
} 

export const query = graphql `
    query HomeQuery($slug: String!) {
        markdownRemark(frontmatter: {slug: {eq: $slug}}) {
            html
        }
        books: allMarkdownRemark(filter: {frontmatter: {type: {eq: "book"}}}) {
            edges {
                node {
                    frontmatter {
                        title
                        description
                        type
                        slug
                    }
                }
            }
        }
    }
`