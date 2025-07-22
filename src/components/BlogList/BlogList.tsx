import { graphql, Link } from 'gatsby';
import * as React from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import Select from 'react-select';
import './BlogList.css';

export interface IBlogListProps {
    posts: any[];
}

const BlogList = ({ posts }: IBlogListProps) => {
    const [selectedTechnologies, setSelectedTechnologies] = React.useState([]);

    // Extract distinct technologies from posts
    const technologies = Array.from(new Set(posts.flatMap(post => post.frontmatter.stack || [])))
        .map(tech => ({ value: tech, label: tech }));

    const handleFilterChange = (selectedOptions) => {
        setSelectedTechnologies(selectedOptions || []);
    };

    const filteredPosts = posts.filter(post => {
        if (selectedTechnologies.length === 0) return true;
        const postTechnologies = post.frontmatter.stack || [];
        return selectedTechnologies.some(selected => postTechnologies.includes(selected.value));
    });

    const customStyles = {
        control: (provided) => ({
            ...provided,
            backgroundColor: 'var(--background-color, #fff)',
            color: 'var(--text-color, #000)',
        }),
        menu: (provided) => ({
            ...provided,
            backgroundColor: 'var(--background-color, #fff)',
            color: 'var(--text-color, #000)',
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isFocused || state.isSelected
                ? 'var(--primary-color, #15202b)'
                : 'var(--background-color, #fff)',
            color: state.isFocused || state.isSelected
                ? 'var(--text-on-primary, #fff)'
                : 'var(--text-color, #000)',
        }),
    };

    return (
        <Container style={{ paddingTop: '20px' }}>
            <div className="filter-section">
                <Form>
                    <Form.Group controlId="technologyFilter">
                        <Form.Label>Technology Stack</Form.Label>
                        <Select
                            isMulti
                            options={technologies}
                            value={selectedTechnologies}
                            onChange={handleFilterChange}
                            placeholder="Select technologies"
                            styles={customStyles} // Apply custom styles
                        />
                    </Form.Group>
                </Form>
            </div>
            <div className="blog-card-container">
                {filteredPosts &&
                    filteredPosts.map((node) => (
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


