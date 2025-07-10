import React from 'react';
import { Link } from 'gatsby';
import './ProjectList.css';

const ProjectList = ({ projects }) => {
    return (
        <div className="project-list">
            {projects.map((project) => (
                <div key={project.fields.slug} className="project-card">
                    <h3>
                        <Link to={project.fields.slug}>{project.frontmatter.title}</Link>
                    </h3>
                    <p>{project.frontmatter.description}</p>
                    <small>{project.frontmatter.date}</small>
                </div>
            ))}
        </div>
    );
};

export default ProjectList;
