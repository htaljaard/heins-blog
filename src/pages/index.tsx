import * as React from "react"
import { graphql, type HeadFC, type PageProps } from "gatsby"
import LayoutMain from "../layout/layout"
import { Container, Image } from "react-bootstrap"
import BlogPage from "./blog"
import { BlogList } from "../components/blog/bloglist"


const IndexPage: React.FC<PageProps> = ({ data }) => {
  let posts = data.allMdx.nodes
  return (
    <LayoutMain pageTitle={"Welcome"} bannerImageUrl="./home.jpg">
      <p>Hi, I'm Hein.</p>

      <p>
        I am a software architect and consultant that has helped many clients over the last 20 years solve real-world problems with software. I have a passion for software development and I love to share my knowledge with others.
      </p>
      <p>
        Welcome to my blog where I share my thoughts, ideas and experiences on .NET, Azure and other technologies.
      </p>

      <BlogList posts={posts} />

    </LayoutMain>
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

export default IndexPage

export const Head: HeadFC = () =>

  <><title>Home</title>
    <link rel='icon' href="./ht.png" />
  </>
