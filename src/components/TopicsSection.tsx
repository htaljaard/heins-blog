import React from "react";
import "./TopicsSection.css";

const TopicsSection = () => {
    const topics = [
        {
            area: "Pro-Code",
            description: "Explore advanced topics like .NET, Web Development, Semantic Kernel, and more."
        },
        {
            area: "Low-Code",
            description: "Dive into tools like Teams, SharePoint, Power Apps, and Copilot Studio."
        },
        {
            area: "Cloud and Infrastructure",
            description: "Learn about Azure, BICEP, and other cloud technologies."
        }
    ];

    return (
        <section className="topics-section">
            <h2>Explore Topics</h2>
            <div className="topics-container">
                {topics.map((topic, index) => (
                    <div key={index} className="topic-card">
                        <h3>{topic.area}</h3>
                        <p>{topic.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default TopicsSection;
