import { graphql, Link } from 'gatsby';
import * as React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';

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
                            <article key={node.id}>
                                <Card style={{ width: '18rem', textDecoration: 'none' }} as={Link} to={node.fields.slug}>
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
            {/* <Row>
                {posts.map(post => { })}
            </Row>
            <ol style={{ listStyle: `none` }}>
                {posts.map(post => {
                    const title = post.frontmatter.title || post.fields.slug

                    return (
                        <li key={post.fields.slug}>
                            <article
                                className="post-list-item"
                                itemScope
                                itemType="http://schema.org/Article"
                            >
                                <header>
                                    <h2>
                                        <Link to={post.fields.slug} itemProp="url">
                                            <span itemProp="headline">{title}</span>
                                        </Link>
                                    </h2>
                                    <small>{post.frontmatter.date}</small>
                                </header>
                                <section>
                                    <p
                                        dangerouslySetInnerHTML={{
                                            __html: post.frontmatter.description || post.excerpt,
                                        }}
                                        itemProp="description"
                                    />
                                </section>
                            </article>
                        </li>
                    )
                })}
            </ol> */}
        </Container>
    );
}
export default BlogList;


