import { graphql, Link } from 'gatsby';
import * as React from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import './BlogList.css';

export interface IBlogListProps {
    posts: any[];
}

const BlogList = ({ posts }: IBlogListProps) => {
    const [technology, setTechnology] = React.useState('');

    return (
        <Container style={{paddingTop: '20px'}}>
            {/* <div className="filter-section">
                <Form>
                    <Form.Group controlId="technologyFilter">
                        <Form.Label>Technology Stack</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter technology"
                            value={technology}
                            onChange={(e) => setTechnology(e.target.value)}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="apply-filters">
                        Fitler
                    </Button>
                </Form>
            </div> */}
            <div className="blog-card-container">
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
            </div>
        </Container>
    );
}
export default BlogList;


