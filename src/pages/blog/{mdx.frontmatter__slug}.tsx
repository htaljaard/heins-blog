import * as React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import Layout from '../../layout/layout'
import Seo from '../../components/Seo/Seo'

const BlogPost = ({ data, children }) => {
  const image = getImage(data.mdx.frontmatter.hero_image)
  const title = data.mdx.frontmatter.title;
  return (
    <Layout pageTitle={title} bannerImageUrl='' data-bs-theme="dark">
      <div data-bs-theme="dark">
        <h1>{title}</h1>
        <p>{data.mdx.frontmatter.date}</p>
        <GatsbyImage
          image={image}
          alt={data.mdx.frontmatter.hero_image_alt}
        />
        <p>
          <a href={data.mdx.frontmatter.hero_image_credit_link}>
            {data.mdx.frontmatter.hero_image_credit_text}
          </a>
        </p>
        {children}
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($id: String) {
    mdx(id: {eq: $id}) {
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        hero_image_alt
        hero_image_credit_link
        hero_image_credit_text
        hero_image {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
    }
  }
`

export const Head = ({ data }) => <Seo title={data.mdx.frontmatter.title} />

export default BlogPost