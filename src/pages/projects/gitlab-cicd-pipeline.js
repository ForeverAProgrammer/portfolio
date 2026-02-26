import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { getProjectById } from '../../data/projects';

export default function GitLabCICDPipeline() {
  const project = getProjectById('gitlab-cicd-pipeline');

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
                <li><strong>Three-Stage Pipeline:</strong> Build → Test → Deploy architecture</li>
                <li><strong>Docker Containers:</strong> Consistent environments using node:18 image</li>
                <li><strong>Intelligent Caching:</strong> Branch-specific caching with push/pull policies to optimize build times</li>
                <li><strong>Artifact Management:</strong> Build outputs passed between stages with configurable expiration</li>
                <li><strong>Code Coverage:</strong> Jest testing with Cobertura format integration into GitLab UI</li>
                <li><strong>GitLab Pages Deployment:</strong> Automated deployment to GitLab Pages</li>
                <li><strong>Branch Protection:</strong> Deploy only from main branch for production safety</li>
                <li><strong>Performance Monitoring:</strong> Cache verification and stage duration tracking</li>
              </ul>
            </div>

            <div className="margin-vert--lg">
              <h2>Pipeline Architecture</h2>
              <p>
                The pipeline follows a classic three-stage design pattern:
              </p>
              <pre style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '4px' }}>
                {`Build → Test → Deploy

Stage 1 (Build):
- Install dependencies
- Compile application
- Push cache (node_modules)
- Generate artifacts (public/)

Stage 2 (Test):
- Pull cache (node_modules)
- Run Jest tests
- Generate coverage reports
- Extract coverage metrics

Stage 3 (Deploy):
- Deploy to GitLab Pages
- Only on main branch
- Uses artifacts from build stage`}
              </pre>
            </div>

            <div className="margin-vert--lg">
              <h2>CI/CD Best Practices</h2>
              <ul>
                <li><strong>Docker Image Pinning:</strong> Uses specific versions (node:18) instead of latest for reproducibility</li>
                <li><strong>Cache Policy Optimization:</strong> Build stage pushes cache, test stage pulls only for faster execution</li>
                <li><strong>Fail Fast:</strong> Test stage runs quickly using cached dependencies</li>
                <li><strong>Artifact Expiration:</strong> Prevents storage bloat with appropriate expiration times</li>
                <li><strong>Branch Rules:</strong> Prevents accidental deployments with branch-specific job execution</li>
                <li><strong>Coverage Integration:</strong> Regex extraction integrates coverage percentages into GitLab&apos;s UI</li>
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
              <h2>Learning Outcomes</h2>
              <p>
                This project demonstrates several advanced CI/CD concepts:
              </p>
              <ul>
                <li>How to structure multi-stage pipelines for efficiency</li>
                <li>When to use push vs pull cache policies</li>
                <li>How to pass build artifacts between pipeline stages</li>
                <li>How to integrate code coverage into GitLab&apos;s native UI</li>
                <li>How to implement branch-based deployment strategies</li>
                <li>How to monitor and optimize pipeline performance</li>
              </ul>
            </div>

            <div className="margin-vert--lg">
              <h2>Related Blog Post</h2>
              <p>
                For a detailed walkthrough of the pipeline architecture and design decisions,
                check out the companion blog post:{' '}
                <Link to="/blog/gitlab-cicd-pipelines">Building CI/CD Pipelines with GitLab</Link>
              </p>
            </div>

            <div className="margin-vert--lg">
              <h2>Getting Started</h2>
              <p>
                Visit the GitLab repository to explore the .gitlab-ci.yml configuration,
                view pipeline execution logs, and see the code coverage reports.
              </p>
            </div>

            <div className="margin-vert--lg" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a
                href={project.githubUrl}
                className="button button--primary button--lg"
                target="_blank"
                rel="noopener noreferrer">
                {project.githubUrl.includes('gitlab.com') ? 'View on GitLab' : 'View on GitHub'}
              </a>
              <a
                href="https://gitlab-cicd-pipeline-example-c2a1fe.gitlab.io/"
                className="button button--secondary button--lg"
                target="_blank"
                rel="noopener noreferrer">
                View Deployed Site
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
