import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

export default function ProjectsPage() {
  const projects = [
    {
      title: 'GitLab CI/CD Pipeline',
      description: 'Production-ready CI/CD pipeline demonstrating automated build, test, and deployment workflows using GitLab. Features Docker containers, intelligent caching strategies, artifact management, code coverage reporting, and automated GitLab Pages deployment.',
      technologies: ['GitLab CI/CD', 'Docker', 'Node.js', 'DevOps', 'Automation', 'Jest'],
      githubUrl: 'https://gitlab.com/kristina-portfolio/gitlab-cicd-pipeline-example',
      link: '/projects/gitlab-cicd-pipeline',
      featured: true
    },
    {
      title: 'Packer Demos',
      description: 'Demonstrations and examples of using HashiCorp Packer for creating machine images across multiple platforms. Includes examples for AWS, Azure, VMware, and more with best practices for image building and CI/CD integration.',
      technologies: ['Packer', 'HCL', 'Infrastructure as Code', 'Automation', 'DevOps'],
      githubUrl: 'https://github.com/ForeverAProgrammer/demos_packer',
      link: '/projects/packer-demos',
      featured: true
    },
    {
      title: 'Mermaid Demos',
      description: 'Collection of Mermaid diagram examples showcasing different chart types and visualization techniques. Includes flowcharts, sequence diagrams, Gantt charts, class diagrams, state diagrams, and entity relationship diagrams.',
      technologies: ['Mermaid', 'Markdown', 'JavaScript', 'Documentation', 'Visualization'],
      githubUrl: 'https://github.com/ForeverAProgrammer/demos_mermaid',
      link: '/projects/mermaid-demos',
      featured: true
    }
  ];

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
            <p style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 3rem', fontSize: '1.1rem', color: '#555' }}>
              A comprehensive collection of my development work, including infrastructure automation,
              documentation tools, and technical demonstrations. Each project showcases practical
              implementations and best practices.
            </p>

            {featuredProjects.length > 0 && (
              <>
                <h2 style={{ marginTop: '3rem', marginBottom: '2rem', color: '#c2185b' }}>Featured Projects</h2>
                <div className="projects-grid">
                  {featuredProjects.map((project, idx) => (
                    <div key={idx} className="project-card">
                      <h3>{project.title}</h3>
                      <p className="project-description">{project.description}</p>
                      <div className="tech-stack">
                        {project.technologies.map((tech, techIdx) => (
                          <span key={techIdx} className="tech-badge">{tech}</span>
                        ))}
                      </div>
                      <div className="project-links">
                        <Link to={project.link} className="button button--secondary button--sm">
                          Learn More
                        </Link>
                        <a
                          href={project.githubUrl}
                          className="button button--outline button--secondary button--sm"
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ marginLeft: '0.5rem' }}>
                          {project.githubUrl.includes('gitlab.com') ? 'View on GitLab' : 'View on GitHub'}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {otherProjects.length > 0 && (
              <>
                <h2 style={{ marginTop: '4rem', marginBottom: '2rem', color: '#c2185b' }}>Other Projects</h2>
                <div className="projects-grid">
                  {otherProjects.map((project, idx) => (
                    <div key={idx} className="project-card">
                      <h3>{project.title}</h3>
                      <p className="project-description">{project.description}</p>
                      <div className="tech-stack">
                        {project.technologies.map((tech, techIdx) => (
                          <span key={techIdx} className="tech-badge">{tech}</span>
                        ))}
                      </div>
                      <div className="project-links">
                        <Link to={project.link} className="button button--secondary button--sm">
                          Learn More
                        </Link>
                        <a
                          href={project.githubUrl}
                          className="button button--outline button--secondary button--sm"
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ marginLeft: '0.5rem' }}>
                          {project.githubUrl.includes('gitlab.com') ? 'View on GitLab' : 'View on GitHub'}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            <div style={{ textAlign: 'center', marginTop: '4rem', padding: '3rem 0', background: 'var(--ifm-background-surface-color)', borderRadius: '8px' }}>
              <h3 style={{ marginBottom: '1rem' }}>Interested in Working Together?</h3>
              <p style={{ marginBottom: '2rem', color: '#555' }}>
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
