import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { getProjectById } from '../../data/projects';

export default function ClaudeDevflow() {
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
              <h2>Skills Included</h2>
              <p>Skills are invoked as <code>/devflow:&lt;skill-name&gt;</code> inside Claude Code.</p>

              <h3>Writing &amp; Communication</h3>
              <ul>
                <li><strong>/devflow:tldr</strong> &mdash; Shorten tech-heavy text into plain English for a non-technical manager</li>
                <li><strong>/devflow:email</strong> &mdash; Turn rough notes into a polished professional email</li>
                <li><strong>/devflow:action-items</strong> &mdash; Extract action items from meeting notes or a wall of text</li>
                <li><strong>/devflow:standup</strong> &mdash; Turn rough notes into a standup update</li>
                <li><strong>/devflow:standup-git</strong> &mdash; Generate a standup update from yesterday&apos;s git commits</li>
              </ul>

              <h3>Planning &amp; Design</h3>
              <ul>
                <li><strong>/devflow:decision</strong> &mdash; Format a description into a structured Architecture Decision Record (ADR)</li>
                <li><strong>/devflow:hld</strong> &mdash; Generate a High Level Design document and write it to <code>design/</code></li>
                <li><strong>/devflow:lld</strong> &mdash; Generate a Low Level Design document; pass <code>--hld</code> to derive from an existing HLD</li>
                <li><strong>/devflow:implement-lld</strong> &mdash; Read an LLD file and apply the code changes it describes</li>
                <li><strong>/devflow:jira-ticket</strong> &mdash; Turn a rough description into a Jira/Linear-style ticket with acceptance criteria</li>
                <li><strong>/devflow:jira-ticket-git</strong> &mdash; Generate a ticket from current git changes or the last commit</li>
              </ul>

              <h3>Git Workflow</h3>
              <ul>
                <li><strong>/devflow:commit</strong> &mdash; Generate a conventional commit message and apply it immediately</li>
                <li><strong>/devflow:create-branch</strong> &mdash; Create a branch named to match the current uncommitted changes</li>
                <li><strong>/devflow:changelog</strong> &mdash; Generate or update a changelog from commits since the last git tag</li>
                <li><strong>/devflow:pr</strong> &mdash; Generate a PR title and description from a summary or diff</li>
                <li><strong>/devflow:resolve-conflicts</strong> &mdash; Rebase the current branch onto the target branch and resolve conflicts</li>
                <li><strong>/devflow:sync</strong> &mdash; Fetch and rebase the current branch onto the default branch</li>
              </ul>

              <h3>GitHub Automation</h3>
              <ul>
                <li><strong>/devflow:create-pr-github</strong> &mdash; Create a GitHub PR from a text description</li>
                <li><strong>/devflow:create-pr-github-git</strong> &mdash; Create a GitHub PR deriving title and description from git history</li>
                <li><strong>/devflow:create-issue-github</strong> &mdash; Create a GitHub issue from a text description</li>
                <li><strong>/devflow:create-issue-branch-github</strong> &mdash; Create a branch linked to a GitHub issue</li>
                <li><strong>/devflow:fix-issue-github</strong> &mdash; Read a GitHub issue and apply code changes to resolve it</li>
                <li><strong>/devflow:fix-issue-github-auto</strong> &mdash; Fully automate resolving a GitHub issue: branch, fix, commit, and PR</li>
              </ul>

              <h3>Code Quality</h3>
              <ul>
                <li><strong>/devflow:review</strong> &mdash; Review code or a diff and give structured feedback with severity levels</li>
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
