import * as React from 'react'
import Layout from '../layout/layout'
import Seo from '../components/Seo/Seo'
import { graphql, Link } from 'gatsby'

interface IBlogPageProps {
    data: {
        allMdx: {
            nodes: {
                frontmatter: {
                    date: string
                    title: string
                    slug: string
                }
                id: string
                excerpt: string
            }
        }
    }
}

const BlogPage = ({ data }: IBlogPageProps) => {
    return (
        <Layout pageTitle="My Blog Posts">
            <ul>
                {
                    data.allMdx.nodes.map((node) => (
                        <article key={node.id}>
                            <h2>
                                <Link to={`/blog/${node.frontmatter.slug}`}>
                                    {node.frontmatter.title}
                                </Link>
                            </h2>
                            <p>Posted: {node.frontmatter.date}</p>
                            <p>{node.excerpt}</p>
                        </article>
                    ))
                }
            </ul>
        </Layout>
    )
}

export const query = graphql`
    query MyQuery {
        allMdx(sort: { frontmatter: { date: DESC } }) {
            nodes {
            frontmatter {
                date(formatString: "MMMM D, YYYY")
                title
                slug
            }
            id
            excerpt
            }
        }
    }`

export const Head = () => <Seo title="My Blog Posts" />

export default BlogPage