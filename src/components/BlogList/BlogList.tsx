import { graphql, Link } from 'gatsby';
import * as React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import './BlogList.css';

export interface IBlogListProps {
    posts: any[];
}

const BlogList = ({ posts }: IBlogListProps) => {

    return (
        <Container>
            <Row>
                {posts &&
                    posts.map((node) => (
                        <Col style={{ margin: '5px' }}>
                            <article key={node.id} className="blog-card">
                                <Card style={{ width: '18rem', textDecoration: 'none' }} as={Link} to={node.fields.slug}>
                                    <Card.Img variant='top' src=""></Card.Img>
                                    <Card.Body>
                                        <Card.Title className="card-title">
                                            {node.frontmatter.title}
                                        </Card.Title>
                                        <Card.Body className="card-description">
                                            {node.excerpt}
                                        </Card.Body>
                                        <Card.Footer>
                                            {node.frontmatter.date}
                                        </Card.Footer>
                                    </Card.Body>
                                </Card>
                            </article>
                        </Col>
                    ))
                }
            </Row>
        </Container>
    );
}
export default BlogList;


