import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { getAllProjects } from '../../data/projects';

export default function ProjectsPage() {
  const projects = getAllProjects();

  const featuredProjects = projects.filter(p => p.featured);
  const otherProjects = projects.filter(p => !p.featured);

  return (
    <Layout
      title="Projects"
      description="Portfolio of development projects and technical demonstrations">
      <main className="container margin-vert--lg">
        <div className="row">
          <div className="col">
            <h1 className="section-title">All Projects</h1>
            <p className="section-subtitle">
              A comprehensive collection of my development work, including infrastructure automation,
              documentation tools, and technical demonstrations. Each project showcases practical
              implementations and best practices.
            </p>

            {featuredProjects.length > 0 && (
              <>
                <h2 style={{ marginTop: '3rem', marginBottom: '2rem', color: '#c2185b' }}>Featured Projects</h2>
                <div className="projects-grid">
                  {featuredProjects.map((project, idx) => (
                    <Link key={idx} to={project.link} className="project-card" style={{ textDecoration: 'none', color: 'inherit' }}>
                      <h3>{project.title}</h3>
                      <p className="project-description">{project.description}</p>
                      <div className="tech-stack">
                        {project.technologies.map((tech, techIdx) => (
                          <span key={techIdx} className="tech-badge">{tech}</span>
                        ))}
                      </div>
                      <div className="project-links">
                        <span className="button button--secondary button--sm">
                          Learn More
                        </span>
                        <a
                          href={project.githubUrl}
                          className="button button--outline button--secondary button--sm"
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ marginLeft: '0.5rem' }}
                          onClick={(e) => e.stopPropagation()}>
                          {project.githubUrl.includes('gitlab.com') ? 'View on GitLab' : 'View on GitHub'}
                        </a>
                      </div>
                    </Link>
                  ))}
                </div>
              </>
            )}

            {otherProjects.length > 0 && (
              <>
                <h2 style={{ marginTop: '4rem', marginBottom: '2rem', color: '#c2185b' }}>Other Projects</h2>
                <div className="projects-grid">
                  {otherProjects.map((project, idx) => (
                    <Link key={idx} to={project.link} className="project-card" style={{ textDecoration: 'none', color: 'inherit' }}>
                      <h3>{project.title}</h3>
                      <p className="project-description">{project.description}</p>
                      <div className="tech-stack">
                        {project.technologies.map((tech, techIdx) => (
                          <span key={techIdx} className="tech-badge">{tech}</span>
                        ))}
                      </div>
                      <div className="project-links">
                        <span className="button button--secondary button--sm">
                          Learn More
                        </span>
                        <a
                          href={project.githubUrl}
                          className="button button--outline button--secondary button--sm"
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ marginLeft: '0.5rem' }}
                          onClick={(e) => e.stopPropagation()}>
                          {project.githubUrl.includes('gitlab.com') ? 'View on GitLab' : 'View on GitHub'}
                        </a>
                      </div>
                    </Link>
                  ))}
                </div>
              </>
            )}

            <div style={{ textAlign: 'center', marginTop: '4rem', padding: '3rem 0', background: 'var(--ifm-background-surface-color)', borderRadius: '8px' }}>
              <h3 style={{ marginBottom: '1rem' }}>Interested in Working Together?</h3>
              <p style={{ marginBottom: '2rem', color: 'var(--ifm-font-color-secondary)' }}>
                Check out my resume or get in touch to discuss your project
              </p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <a href="/files/resume.pdf" className="button button--primary button--lg" download="Kristina_Haynes_Resume.pdf">
                  Download Resume
                </a>
                <Link to="/" className="button button--secondary button--lg">
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
