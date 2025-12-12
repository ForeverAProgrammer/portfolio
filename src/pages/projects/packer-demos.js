import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { getProjectById } from '../../data/projects';

export default function PackerDemos() {
  const project = getProjectById('packer-demos');

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
              <h2>Key Features</h2>
              <ul>
                <li>Automated machine image creation</li>
                <li>Multi-platform support (AWS, Azure, VMware, etc.)</li>
                <li>Infrastructure as Code examples</li>
                <li>Best practices for image building</li>
                <li>CI/CD integration patterns</li>
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
              <h2>Getting Started</h2>
              <p>
                Visit the GitHub repository to explore the code, read the documentation,
                and try out the examples.
              </p>
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
