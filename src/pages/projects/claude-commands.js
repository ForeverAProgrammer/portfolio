import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { getProjectById } from '../../data/projects';

export default function ClaudeCommands() {
  const project = getProjectById('claude-commands');

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
              <h2>Commands Included</h2>
              <ul>
                <li><strong>/standup</strong> &mdash; Generate a standup update from notes</li>
                <li><strong>/standup-git</strong> &mdash; Generate a standup update from yesterday&apos;s git commits</li>
                <li><strong>/commit</strong> &mdash; Generate a conventional commit message</li>
                <li><strong>/pr</strong> &mdash; Generate a pull request title and description</li>
                <li><strong>/create-pr-github</strong> &mdash; Create a GitHub PR via the GitHub CLI</li>
                <li><strong>/email</strong> &mdash; Draft a professional email from notes</li>
                <li><strong>/action-items</strong> &mdash; Extract action items from text</li>
                <li><strong>/tldr</strong> &mdash; Summarize text for a non-technical audience</li>
                <li><strong>/create-branch</strong> &mdash; Generate a descriptive branch name</li>
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

            <div className="margin-vert--lg" style={{ display: 'flex', gap: '1rem' }}>
              <a
                href={project.githubUrl}
                className="button button--primary button--lg"
                target="_blank"
                rel="noopener noreferrer">
                View on GitHub
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
