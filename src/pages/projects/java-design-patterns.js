import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { getProjectById } from '../../data/projects';

export default function JavaDesignPatterns() {
  const project = getProjectById('java-design-patterns');

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
              <p>{project.overview}</p>
            </div>

            <div className="margin-vert--lg">
              <h2>Patterns Covered</h2>
              <ul>
                <li>
                  <strong>Behavioral:</strong> Command, Iterator, Observer, State,
                  Strategy, Template Method
                </li>
                <li>
                  <strong>Structural:</strong> Adapter, Composite, Decorator, Facade,
                  Proxy
                </li>
                <li>
                  <strong>Creational:</strong> Factory, Singleton
                </li>
                <li>
                  <strong>Compound:</strong> MVC, Multi-Pattern Duck Simulator
                </li>
              </ul>
            </div>

            <div className="margin-vert--lg">
              <h2>Technologies Used</h2>
              <div className="tech-stack">
                {project.technologies.map((tech, idx) => (
                  <span key={idx} className="tech-badge">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="margin-vert--lg">
              <h2>Getting Started</h2>
              <p>
                Visit the GitHub repository to explore the code and examples. Each
                pattern is self-contained and can be compiled independently using the
                included <code>compile.sh</code> script.
              </p>
            </div>

            <div className="margin-vert--lg" style={{ display: 'flex', gap: '1rem' }}>
              <a
                href={project.githubUrl}
                className="button button--primary button--lg"
                target="_blank"
                rel="noopener noreferrer">
                View on GitHub
              </a>
              <Link to="/projects" className="button button--secondary button--lg">
                Back to Projects
              </Link>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
