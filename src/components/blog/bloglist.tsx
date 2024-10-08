import * as React from 'react';
import Layout from '../../layout/layout';
import { Card, Col, Row } from 'react-bootstrap';
import { Link } from 'gatsby';

export interface IBlogListProps {
    posts: [];
}

export function BlogList({ posts }: IBlogListProps) {
    return (

        <Row>
            {posts &&
                posts.map((node) => (
                    <Col style={{ margin: '5px' }}>
                        <article key={node.id}>
                            <Card style={{ width: '18rem', textDecoration: 'none' }} as={Link} to={`/blog/${node.frontmatter.slug}`}  >
                                <Card.Img variant='top' src=""></Card.Img>
                                <Card.Body>
                                    <Card.Title>
                                        {node.frontmatter.title}
                                    </Card.Title>
                                    <Card.Body>
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

    );
}

