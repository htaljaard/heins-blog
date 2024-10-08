import * as React from 'react'
import Layout from '../../layout/layout'
import Seo from '../../components/Seo/Seo'
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
    let posts = data.allMdx.nodes
    return (
        <Layout pageTitle="Articles" bannerImageUrl='/blogbanner.jpg'>
            <BlogList posts={posts} />
        </Layout>
    )
}
import 'bootstrap/dist/css/bootstrap.min.css'
import { Card, Col, Row } from 'react-bootstrap'
import { BlockList } from 'net'
import { BlogList } from '../../components/blog/bloglist'

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

export const Head = () => <Seo title="Blog Posts" />

export default BlogPage