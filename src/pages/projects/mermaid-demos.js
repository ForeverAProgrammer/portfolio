import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { getProjectById } from '../../data/projects';

export default function MermaidDemos() {
  const project = getProjectById('mermaid-demos');

  return (
    <Layout
      title={project.title}
      description={project.description}>
      <main className="container margin-vert--lg">
        <div className="row">
          <div className="col col--8 col--offset-2">
            <h1>{project.title}</h1>

            <div className="margin-vert--lg">
              <h2>Overview</h2>
              <p>
                {project.overview}
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
                {project.technologies.map((tech, idx) => (
                  <span key={idx} className="tech-badge">{tech}</span>
                ))}
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
                href={project.githubUrl}
                className="button button--primary button--lg"
                target="_blank"
                rel="noopener noreferrer">
                {project.githubUrl.includes('gitlab.com') ? 'View on GitLab' : 'View on GitHub'}
              </a>
              <Link
                to="/projects"
                className="button button--secondary button--lg">
                Back to Projects
              </Link>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
