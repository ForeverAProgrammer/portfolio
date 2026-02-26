import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { getAllExperiences } from '../data/experience';

export default function ExperiencePage() {
  const experiences = getAllExperiences();

  return (
    <Layout
      title="Work Experience"
      description="Complete work history and professional experience">
      <main className="container margin-vert--lg">
        <div className="row">
          <div className="col col--10 col--offset-1">
            <h1 className="section-title">Work Experience</h1>
            <p className="section-subtitle">
              Over 15 years of professional software development experience across full-stack web development,
              database optimization, and enterprise software solutions.
            </p>

            <div className="timeline">
              {experiences.map((exp, idx) => (
                <div key={idx} className="timeline-item">
                  <h3>{exp.title}</h3>
                  <div className="timeline-meta">{exp.company} • {exp.period}</div>

                  {exp.overview && <p>{exp.overview}</p>}

                  {exp.roles && (
                    <ul>
                      {exp.roles.map((role, i) => (
                        <li key={i}><strong>{role.split(' - ')[0]}</strong> - {role.split(' - ')[1]}</li>
                      ))}
                    </ul>
                  )}

                  {exp.details && (
                    <div className="experience-details">
                      {Object.entries(exp.details).map(([category, items], i) => (
                        <div key={i}>
                          <h4>{category}</h4>
                          <ul>
                            {items.map((item, j) => (
                              <li key={j}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}

                  {exp.responsibilities && (
                    <ul>
                      {exp.responsibilities.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  )}

                  <div className="tech-stack">
                    {exp.technologies.map((tech, i) => (
                      <span key={i} className="tech-badge">{tech}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: '4rem', padding: '3rem 0', background: 'var(--ifm-background-surface-color)', borderRadius: '8px' }}>
              <h3 style={{ marginBottom: '1rem' }}>Want to Learn More?</h3>
              <p style={{ marginBottom: '2rem', color: 'var(--ifm-font-color-secondary)' }}>
                Download my complete resume or return to the homepage
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
