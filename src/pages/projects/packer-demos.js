import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

export default function PackerDemos() {
  return (
    <Layout
      title="Packer Demos"
      description="Demonstrations and examples of using HashiCorp Packer">
      <main className="container margin-vert--lg">
        <div className="row">
          <div className="col col--8 col--offset-2">
            <h1>Packer Demos</h1>

            <div className="margin-vert--lg">
              <h2>Overview</h2>
              <p>
                This project contains demonstrations and examples of using HashiCorp Packer
                for creating machine images across multiple platforms. Packer is an open-source
                tool for creating identical machine images for multiple platforms from a single
                source configuration.
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
                <span className="tech-badge">Packer</span>
                <span className="tech-badge">HCL</span>
                <span className="tech-badge">Infrastructure as Code</span>
                <span className="tech-badge">Automation</span>
                <span className="tech-badge">DevOps</span>
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
                href="https://github.com/ForeverAProgrammer/demos_packer"
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
