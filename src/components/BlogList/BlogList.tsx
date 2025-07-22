import { graphql, Link } from 'gatsby';
import * as React from 'react';
import { Container } from 'react-bootstrap';
import './BlogList.css';

export interface IBlogListProps {
    posts: any[];
}

const BlogList = ({ posts }: IBlogListProps) => {
    return (
        <Container className="blog-card-container">
            {posts &&
                posts.map((node) => (
                    <article key={node.id} className="blog-card">
                        <Link to={node.fields.slug}>
                            <div>
                                <h2 className="blog-card-title">
                                    {node.frontmatter.title}
                                </h2>
                                <p className="blog-card-body">
                                    {node.excerpt}
                                </p>
                                <div className="blog-card-footer">
                                    {node.frontmatter.date}
                                </div>
                            </div>
                        </Link>
                    </article>
                ))
            }
        </Container>
    );
}
export default BlogList;


