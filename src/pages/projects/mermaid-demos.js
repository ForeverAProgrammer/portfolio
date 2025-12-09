import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

export default function MermaidDemos() {
  return (
    <Layout
      title="Mermaid Demos"
      description="Collection of Mermaid diagram examples and visualizations">
      <main className="container margin-vert--lg">
        <div className="row">
          <div className="col col--8 col--offset-2">
            <h1>Mermaid Demos</h1>

            <div className="margin-vert--lg">
              <h2>Overview</h2>
              <p>
                This project showcases various Mermaid diagram types and visualization techniques.
                Mermaid is a JavaScript-based diagramming and charting tool that uses Markdown-inspired
                text definitions to create and modify diagrams dynamically.
              </p>
            </div>

            <div className="margin-vert--lg">
              <h2>Diagram Types Included</h2>
              <ul>
                <li>Flowcharts - Process flows and decision trees</li>
                <li>Sequence Diagrams - System interactions and API flows</li>
                <li>Gantt Charts - Project timelines and scheduling</li>
                <li>Class Diagrams - Object-oriented design structures</li>
                <li>State Diagrams - System state transitions</li>
                <li>Entity Relationship Diagrams - Database schema visualization</li>
              </ul>
            </div>

            <div className="margin-vert--lg">
              <h2>Technologies Used</h2>
              <div className="tech-stack">
                <span className="tech-badge">Mermaid</span>
                <span className="tech-badge">Markdown</span>
                <span className="tech-badge">JavaScript</span>
                <span className="tech-badge">Documentation</span>
                <span className="tech-badge">Visualization</span>
              </div>
            </div>

            <div className="margin-vert--lg">
              <h2>Use Cases</h2>
              <p>
                These examples demonstrate how to create clear, maintainable diagrams for:
              </p>
              <ul>
                <li>Technical documentation</li>
                <li>Architecture diagrams</li>
                <li>Process documentation</li>
                <li>Project planning</li>
                <li>Training materials</li>
              </ul>
            </div>

            <div className="margin-vert--lg" style={{ display: 'flex', gap: '1rem' }}>
              <a
                href="https://github.com/ForeverAProgrammer/demos_mermaid"
                className="button button--primary button--lg"
                target="_blank"
                rel="noopener noreferrer">
                View on GitHub
              </a>
              <Link
                to="/"
                className="button button--secondary button--lg">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
