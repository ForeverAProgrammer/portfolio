import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.tagline}
        </Heading>
        <p className="hero__subtitle">Full Stack Engineer specializing in web development, database optimization, and cloud infrastructure</p>
        <div className="hero-tags">
          <span className="tag">AWS</span>
          <span className="tag">Docker</span>
          <span className="tag">Kubernetes</span>
          <span className="tag">React • Node.js</span>
          <span className="tag">CI/CD</span>
        </div>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/#work">
            View My Work
          </Link>
          <Link
            className="button button--secondary button--lg"
            to="/#education"
            style={{ marginLeft: '1rem' }}>
            Education
          </Link>
          <Link
            className="button button--secondary button--lg"
            to="/#resume"
            style={{ marginLeft: '1rem' }}>
            Skills & Resume
          </Link>
        </div>
      </div>
    </header>
  );
}

function AboutSection() {
  return (
    <section className="portfolio-section about-section">
      <div className="container">
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h2 className="section-title">About Me</h2>
          <p className="about-text">
            I'm a Full Stack Engineer with over 10 years of experience building scalable web applications,
            optimizing database performance, and implementing DevOps workflows. I specialize in cloud infrastructure,
            containerization, and modern web development. When I'm not coding, I create technical documentation
            and tutorials to help others learn DevOps and full-stack development.
          </p>
        </div>
      </div>
    </section>
  );
}

function WorkHighlights() {
  const highlights = [
    {
      title: 'Software Engineer',
      company: 'Itential',
      period: 'Jul 2018 - Present',
      description: 'Network automation company providing solutions for enterprise IT infrastructure management. Career progression through multiple roles from Network Automation Engineer to current Software Engineer role.',
      achievements: [
        'Developed automation solutions for network infrastructure',
        'Designed custom React, Angular, and AngularJS applications for customers',
        'Built CI/CD pipelines, managed UAT environments, and automated release processes',
        'Full-stack development on the Itential Automation Platform (IAP/P6) product'
      ],
      tech: ['React', 'Angular', 'Node.js', 'CI/CD', 'DevOps', 'Network Automation']
    },
    {
      title: 'Software Engineer',
      company: 'ClearCorrect',
      period: 'Mar 2012 - Jul 2018',
      description: 'Led full-stack development of responsive web applications with 3D model visualization, managed SQL Server databases, and implemented JIRA workflows for the development team.',
      achievements: [
        'Built responsive 3D model viewer with jQuery and HTML5',
        'Created reporting database to improve production performance',
        'Integrated Zendesk Help Desk with ASP.NET applications'
      ],
      tech: ['ASP.NET', 'C#', 'JavaScript', 'SQL Server', 'JIRA']
    },
    {
      title: 'Senior Consultant',
      company: 'Quorum Business Solutions',
      period: 'Dec 2010 - Jan 2012',
      description: 'Led support team for enterprise software solutions, mentored junior developers, and worked directly with clients to deliver custom C++ enhancements.',
      achievements: [
        'Led team solving client application issues with 100% satisfaction',
        'Trained junior consultants on application architecture',
        'Worked with Project Architect on new feature development'
      ],
      tech: ['C++', 'SQL', 'Team Leadership', 'Client Relations']
    }
  ];

  return (
    <section id="work" className="portfolio-section">
      <div className="container">
        <h2 className="section-title">Work Highlights</h2>
        <div style={{ display: 'grid', gap: '2rem', marginTop: '2rem' }}>
          {highlights.map((job, idx) => (
            <div key={idx} className="timeline-item">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.5rem' }}>
                <h3 style={{ margin: 0 }}>{job.title}</h3>
                <span className="timeline-meta">{job.period}</span>
              </div>
              <h4 style={{ color: '#c2185b', marginBottom: '1rem' }}>{job.company}</h4>
              <p style={{ fontSize: '1.05rem', marginBottom: '1rem' }}>{job.description}</p>
              <ul style={{ marginBottom: '1rem' }}>
                {job.achievements.map((achievement, i) => (
                  <li key={i}>{achievement}</li>
                ))}
              </ul>
              <div className="tech-stack">
                {job.tech.map((tech, i) => (
                  <span key={i} className="tech-badge">{tech}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/experience" className="button button--secondary button--lg">
            View All Experience
          </Link>
          <a href="/files/resume.pdf" className="button button--primary button--lg" download="Kristina_Haynes_Resume.pdf">
            Download Resume
          </a>
        </div>
      </div>
    </section>
  );
}

function FeaturedProjects() {
  const projects = [
    {
      title: 'GitLab CI/CD Pipeline',
      description: 'Production-ready CI/CD pipeline demonstrating automated build, test, and deployment workflows',
      technologies: ['GitLab CI/CD', 'Docker', 'DevOps'],
      githubUrl: 'https://gitlab.com/kristina-portfolio/gitlab-cicd-pipeline-example',
      link: '/projects/gitlab-cicd-pipeline'
    },
    {
      title: 'Packer Demos',
      description: 'Demonstrations and examples of using HashiCorp Packer for creating machine images across multiple platforms',
      technologies: ['Packer', 'Infrastructure as Code', 'Automation'],
      githubUrl: 'https://github.com/ForeverAProgrammer/demos_packer',
      link: '/projects/packer-demos'
    },
    {
      title: 'Mermaid Demos',
      description: 'Collection of Mermaid diagram examples showcasing different chart types and visualization techniques',
      technologies: ['Mermaid', 'Diagrams', 'Documentation'],
      githubUrl: 'https://github.com/ForeverAProgrammer/demos_mermaid',
      link: '/projects/mermaid-demos'
    }
  ];

  return (
    <section id="projects" className="portfolio-section">
      <div className="container">
        <h2 className="section-title">Featured Projects</h2>
        <p className="section-subtitle">
          A selection of my development work and technical demonstrations
        </p>
        <div className="projects-grid">
          {projects.map((project, idx) => (
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
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <Link to="/projects" className="button button--primary button--lg">
            View All Projects
          </Link>
        </div>
      </div>
    </section>
  );
}

function DocsSection() {
  const docs = [
    {
      icon: '🐧',
      title: 'Linux Fundamentals',
      description: 'Master Linux distributions, terminal basics, user management, and system administration',
      link: '/docs/linux'
    },
    {
      icon: '☕',
      title: 'Java Programming',
      description: 'Best practices, variable types, and modern Java features for cleaner code',
      link: '/docs/java'
    },
    {
      icon: '🎨',
      title: 'Design Patterns',
      description: 'GOF patterns from Head First Design Patterns with Java examples and UML diagrams',
      link: '/docs/design-patterns'
    },
    {
      icon: '🧪',
      title: 'Testing',
      description: 'Unit, integration, and E2E testing with JUnit and best practices',
      link: '/docs/testing'
    },
    {
      icon: '☁️',
      title: 'DevOps & Cloud',
      description: 'Docker, Kubernetes, and CI/CD pipelines for modern infrastructure',
      link: '/docs/devops'
    },
    {
      icon: '🔨',
      title: 'Build Tools',
      description: 'Gradle build automation and dependency management',
      link: '/docs/build-tools'
    },
    {
      icon: '🌐',
      title: 'Web Development',
      description: 'HTML basics and character encoding fundamentals',
      link: '/docs/web-development'
    },
    {
      icon: '⚡',
      title: 'JAMstack',
      description: 'Static site generators: Docusaurus, Gatsby, and Hugo guides',
      link: '/docs/jamstack'
    },
    {
      icon: '🗄️',
      title: 'Database',
      description: 'T-SQL guide for Microsoft SQL Server development',
      link: '/docs/database'
    }
  ];

  return (
    <section id="docs" className="portfolio-section">
      <div className="container">
        <h2 className="section-title">Documentation & Guides</h2>
        <p className="section-subtitle">
          Comprehensive tutorials and guides to help you master modern development tools and technologies
        </p>
        <div className="docs-grid">
          {docs.map((doc, idx) => (
            <Link key={idx} to={doc.link} className="doc-card">
              <div className="doc-icon">{doc.icon}</div>
              <h3>{doc.title}</h3>
              <p>{doc.description}</p>
            </Link>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <Link to="/docs/intro" className="button button--primary button--lg">
            Browse All Documentation
          </Link>
        </div>
      </div>
    </section>
  );
}

function EducationSection() {
  const education = [
    {
      school: 'Texas A&M',
      degree: 'Bachelor of Business Administration',
      field: 'Management Information Systems',
      years: '2006 - 2008',
      activities: [
        'Association of Information Technology Professionals',
        'Japan Club',
        'TAMU Linux Users Group',
        'Texas A&M University Kendo Kyokai',
        'Texas A&M Iaido Kyokai'
      ]
    },
    {
      school: 'Blinn College',
      degree: 'Associate in Science',
      field: 'Business',
      years: '2004 - 2006',
      grade: '3.7 GPA',
      honors: 'Graduated Magna Cum Laude',
      achievements: [
        "Dean's List",
        "President's Scholar"
      ],
      activities: [
        'Phi Theta Kappa',
        'Sigma Kappa Delta',
        'Kappa Kappa Psi',
        'Band'
      ]
    }
  ];

  return (
    <section id="education" className="portfolio-section">
      <div className="container">
        <h2 className="section-title">Education</h2>
        <div className="timeline">
          {education.map((edu, idx) => (
            <div key={idx} className="timeline-item">
              <h3>{edu.school}</h3>
              <div className="timeline-meta">{edu.years}</div>
              <h4 className="education-degree">{edu.degree}, {edu.field}</h4>
              {edu.grade && <p className="education-grade">GPA: {edu.grade}</p>}
              {edu.honors && <p className="education-honors"><strong>{edu.honors}</strong></p>}
              {edu.achievements && (
                <div className="education-achievements">
                  <strong>Honors:</strong>
                  <ul>
                    {edu.achievements.map((achievement, i) => (
                      <li key={i}>{achievement}</li>
                    ))}
                  </ul>
                </div>
              )}
              {edu.activities && (
                <div className="education-activities">
                  <strong>Activities and Societies:</strong>
                  <p>{edu.activities.join(', ')}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CertificationsSection() {
  const certifications = [
    {
      title: 'HTML5 from W3C',
      organization: 'edX',
      url: 'https://credentials.edx.org/credentials/1fb04187579e4322a7876eb3cf961e32/'
    },
    {
      title: 'HTML5.2x: HTML5 Part 2: Advanced Techniques for Designing HTML5 Apps',
      organization: 'edX',
      url: 'https://courses.edx.org/certificates/6d992f6786be4932b4ab843565a53f6a'
    },
    {
      title: 'HTML5.1x: HTML5 Part 1: HTML5 Coding Essentials and Best Practices',
      organization: 'edX',
      url: 'https://courses.edx.org/certificates/eda66a78f04d4ea5a69d2022699f52b7'
    },
    {
      title: 'edX Verified Certificate for HTML5 Introduction',
      organization: 'edX',
      url: 'https://courses.edx.org/certificates/4fea576a08d3425cbe8d997fcb653cff'
    },
    {
      title: 'edX Honor Code Certificate for Querying with Transact-SQL',
      organization: 'edX',
      url: 'https://courses.edx.org/certificates/80518404f8c042df99c783d66a485b0e'
    }
  ];

  return (
    <section id="certifications" className="portfolio-section">
      <div className="container">
        <h2 className="section-title">Licenses & Certifications</h2>
        <div className="certifications-grid">
          {certifications.map((cert, idx) => (
            <Link key={idx} to={cert.url} className="certification-card" target="_blank" rel="noopener noreferrer">
              <div className="cert-icon">🎓</div>
              <h3>{cert.title}</h3>
              <p className="cert-org">{cert.organization}</p>
              <span className="cert-link">View Certificate →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function ResumeSection() {
  const skills = {
    'Languages & Frameworks': [
      'JavaScript, TypeScript',
      'Java',
      'VB.NET',
      'ASP.NET',
      'HTML5, CSS3',
      'Node.js',
      'React, Angular, AngularJS'
    ],
    'Frontend Development': [
      'jQuery, Bootstrap',
      'HTML5 & CSS3',
      'React, AngularJS & Angular',
      'TypeScript',
      'Responsive Design'
    ],
    'Backend & Databases': [
      'Microsoft SQL Server',
      'SQL & T-SQL',
      'MongoDB',
      'Database Design',
      'Query Optimization',
      'NodeJS',
      "Express.js",
      "Spring Boot"
    ],
    'DevOps & Tools': [
      'Docker & Kubernetes',
      'Ansible, Vagrant',
      'Jenkins, GitLab CI',
      'Git & GitHub',
      'Linux Administration'
    ],
    'Cloud & Infrastructure': [
      'AWS',
      "ArgoCD",
      'Terraform',
      'Infrastructure as Code',
      'Monitoring & Logging'
    ],
    'Professional Skills': [
      'Software Development',
      'Business Analysis',
      'Testing & QA',
      'Agile/Scrum',
      'Technical Documentation',
      'Team Leadership'
    ]
  };

  return (
    <section id="resume" className="portfolio-section">
      <div className="container">
        <div className="resume-section">
          <h2 className="section-title">Resume & Skills</h2>
          <p>Download my complete resume or view my technical skills below</p>
          <div className={styles.buttons} style={{ marginBottom: '2rem' }}>
            <a
              className="button button--primary button--lg"
              href="/files/resume.pdf"
              download="Kristina_Haynes_Resume.pdf">
              Download PDF
            </a>
            <a
              className="button button--primary button--lg"
              href="https://www.linkedin.com/in/kristina-haynes-94915147"
              style={{ marginLeft: '1rem' }}
              target="_blank"
              rel="noopener noreferrer">
              View on LinkedIn
            </a>
          </div>

          <div className="skills-grid">
            {Object.entries(skills).map(([category, items], idx) => (
              <div key={idx} className="skill-category">
                <h4>{category}</h4>
                <ul>
                  {items.map((item, itemIdx) => (
                    <li key={itemIdx}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Portfolio`}
      description="DevOps Engineer & Full Stack Developer Portfolio">
      <HomepageHeader />
      <main>
        <AboutSection />
        <WorkHighlights />
        <FeaturedProjects />
        <EducationSection />
        <CertificationsSection />
        <ResumeSection />
      </main>
    </Layout>
  );
}
