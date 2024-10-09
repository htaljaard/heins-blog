import * as React from 'react';
import Seo from '../components/seo';
import Layout from '../layout/layout';
import { graphql } from 'gatsby';
import BlogList from '../components/BlogList/BlogList';

export interface IBlogPageProps {
}

const BlogPage = ({ location, data }) => {
  const posts = data.allMarkdownRemark.nodes
  return (
    <Layout location={location} title="Blogs">
      <BlogList posts={posts}></BlogList>
    </Layout>
  );
}

export const Head = () => <Seo title="All posts" description="All blogs" />
export default BlogPage;

export const pageQuery = graphql`
  {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
        }
      }
    }
  }
`