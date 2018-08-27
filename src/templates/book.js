import React from 'react'

export default ({ data }) => {
    
    const { html } = data.markdownRemark
    const { title, description, id, price, guid, slug } = data.markdownRemark.frontmatter
    const image = require(`../images/${id}.jpeg`)

    return (
        <div>
            <h1>{ title }</h1>
            <p>{ description }</p>
            <div style={{ display: 'flex', justifyContent: 'space-beetween' }}>
                <div style={{ width: '40%' }}>
                    <img src={image} alt={title} />
                </div>
            <div style={{ width: '40%' }} dangerouslySetInnerHTML={{__html: html }}></div>
            </div>
            <button className="snipcart-add-item" 
                    data-item-id={id}
                    data-item-name={title}
                    data-item-price={price}
                    data-item-description={description}
                    data-item-url={slug}
                    data-item-file-guid={guid}
                    data-item-image={image}
                    data-item-max-quantity={1}
            >
                Acheter
            </button>
        </div>
    )
} 

export const query = graphql `
    query BookQuery($slug: String!) {
        markdownRemark(frontmatter: {slug: { eq: $slug }}) {
            html
            frontmatter {
                title
                description
                id
                price
                guid
                slug
            }
        }
    }
`