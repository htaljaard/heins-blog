import * as React from 'react';
import Seo from '../components/seo';
import Layout from '../layout/layout';
import { graphql } from 'gatsby';
import BlogList from '../components/BlogList/BlogList';
import SearchAndFilter from '../components/SearchAndFilter';
import { useState } from 'react';

export interface IBlogPageProps {
}

const BlogPage = ({ location, data }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const posts = data.allMarkdownRemark.nodes;

  const filteredPosts = posts.filter(post =>
    post.frontmatter.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.frontmatter.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout location={location} title="Blogs">
      <SearchAndFilter searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <BlogList posts={filteredPosts}></BlogList>
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
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/content/blog/" } },
      sort: { frontmatter: { date: DESC } }
    ) {
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
`;