import * as React from 'react';
import Seo from '../components/seo';
import Layout from '../layout/layout';
import { graphql } from 'gatsby';
import ProjectList from '../components/ProjectList/ProjectList';
import SearchAndFilter from '../components/SearchAndFilter';

const ProjectsPage = ({ location, data }) => {
    const projects = data.allMarkdownRemark.nodes;
    return (
        <Layout location={location} title="Projects">
            <SearchAndFilter />
            <ProjectList projects={projects}></ProjectList>
        </Layout>
    );
};

export const Head = () => <Seo title="All projects" description="All projects" />;
export default ProjectsPage;

export const pageQuery = graphql`
  {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/content/projects/" } },
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
