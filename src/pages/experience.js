import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

export default function ExperiencePage() {
  return (
    <Layout
      title="Work Experience"
      description="Complete work history and professional experience">
      <main className="container margin-vert--lg">
        <div className="row">
          <div className="col col--10 col--offset-1">
            <h1 className="section-title">Work Experience</h1>
            <p style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 3rem', fontSize: '1.1rem', color: '#555' }}>
              Over 10 years of professional software development experience across full-stack web development,
              database optimization, and enterprise software solutions.
            </p>

            <div className="timeline">
              <div className="timeline-item">
                <h3>Software Engineer</h3>
                <div className="timeline-meta">Itential • Jul 2018 - Present</div>
                <p>
                  Network automation company providing solutions for enterprise IT infrastructure management.
                  Career progression through multiple roles:
                </p>
                <ul>
                  <li><strong>Network Automation Engineer</strong> - Developed automation solutions for network infrastructure</li>
                  <li><strong>Software Architecture/Team Lead on Customer Projects</strong> - Designed custom React, Angular, and AngularJS applications for customers and led customer project delivery</li>
                  <li><strong>Manager, Internal Tools Department</strong> - Managed team building internal automation and productivity tools</li>
                  <li><strong>Testing and Release Engineer (DevOps Engineer)</strong> - Built CI/CD pipelines, managed UAT environments, and automated release processes</li>
                  <li><strong>Software Engineer</strong> - Full-stack development working on the Itential Automation Platform (IAP/P6) product</li>
                </ul>
              </div>

              <div className="timeline-item">
                <h3>Software Engineer</h3>
                <div className="timeline-meta">ClearCorrect • Mar 2012 - Jul 2018</div>
                <div className="experience-details">
                  <h4>Web Development</h4>
                  <ul>
                    <li>Developed and maintained a responsive website that displays 3D models using jQuery, AJAX, JavaScript, CSS and HTML5 with different views on mobile and desktop devices</li>
                    <li>Developed and maintained websites using ASP.NET, VB.NET, jQuery, JavaScript, AJAX, CSS and HTML5</li>
                    <li>Worked directly with the Product Architect to develop new features and enhancements</li>
                    <li>Designed and developed a job scheduler for an ASP.NET website</li>
                  </ul>
                  <h4>Application Development</h4>
                  <ul>
                    <li>Maintained a C# desktop application that controls a Laser Marker</li>
                    <li>Refactored existing code to enhance performance, reliability, and maintainability</li>
                    <li>Diagnosed and resolved problems arising from trimmer machines running software written in C#</li>
                    <li>Diagnosed and resolved problems arising from C++ 3D software</li>
                  </ul>
                  <h4>Database</h4>
                  <ul>
                    <li>Supported multiple database modifications and development to multiple Microsoft SQL Server databases</li>
                    <li>Identified and resolved problems with the databases such as poorly performing queries, missing foreign keys, identifying queries that are causing deadlocks and missing indexes</li>
                    <li>Spearheaded the creation of a reporting database to reduce the load on the production database and improve the production database performance</li>
                  </ul>
                  <h4>JIRA</h4>
                  <ul>
                    <li>Assisted with the administration of Atlassian tools</li>
                    <li>Setup JIRA for tracking enhancements, bugs and Help Desk requests</li>
                    <li>Created and maintained JIRA workflows for the Software Development department</li>
                    <li>Integrated JIRA with HipChat and BitBucket</li>
                    <li>Created and managed security schemes, permission schemes and configurations</li>
                    <li>Managed and administered JIRA/BitBucket add-ons, plugins, and extensions</li>
                  </ul>
                  <h4>Help Desk</h4>
                  <ul>
                    <li>Migrated the Help Desk from JitBit to Zendesk</li>
                    <li>Managed Tier 1, Tier 2 and Tier 3 Help Desk using JitBit, JIRA and Zendesk</li>
                    <li>Integrated Zendesk with an ASP.NET site so that users can log Help Desk tickets from within the site</li>
                  </ul>
                </div>
                <div className="tech-stack">
                  <span className="tech-badge">ASP.NET</span>
                  <span className="tech-badge">C#</span>
                  <span className="tech-badge">JavaScript</span>
                  <span className="tech-badge">SQL Server</span>
                  <span className="tech-badge">JIRA</span>
                </div>
              </div>

              <div className="timeline-item">
                <h3>Senior Consultant</h3>
                <div className="timeline-meta">Quorum Business Solutions • Dec 2010 - Jan 2012</div>
                <div className="experience-details">
                  <h4>Midstream Support Hub</h4>
                  <ul>
                    <li>Led a small team in charge of solving client application specific issues</li>
                    <li>Served as an assistant Business Liaison for Client Support issues</li>
                    <li>Became the Technical Expert in the Support Hub charged with providing training for junior consultants in how to use and understand the TIPS application code and other database structures</li>
                    <li>Completed multiple smaller client oriented projects with a 100% satisfaction rate</li>
                    <li>Approved issue estimates for the Support Hub in order to guarantee that issues were being completed in a timely manner, within budget, and that the estimates from the developers were both reasonable and realistic</li>
                    <li>Served as a Mentor to Junior Employees for direct training and support</li>
                    <li>Prepared and executed test cases to ensure proper configuration of TIPS</li>
                    <li>Prepared configuration documentation for Clients, explaining in detail their current TIPS configuration with the data provided</li>
                  </ul>
                  <h4>Core Team Developer</h4>
                  <ul>
                    <li>Used C++ to debug the TIPS application code and make enhancements based on specific client requests and designs</li>
                    <li>Worked directly with the Project Architect to develop new features and enhancements</li>
                    <li>Refactored existing code to enhance performance, reliability, and maintainability</li>
                  </ul>
                </div>
                <div className="tech-stack">
                  <span className="tech-badge">C++</span>
                  <span className="tech-badge">SQL</span>
                  <span className="tech-badge">TIPS</span>
                  <span className="tech-badge">Team Leadership</span>
                </div>
              </div>

              <div className="timeline-item">
                <h3>Consultant</h3>
                <div className="timeline-meta">Quorum Business Solutions • Jul 2008 - Nov 2010</div>
                <ul>
                  <li>Developed and Repaired Crystal Reports for the Quorum TIPS, QCM, and QDOD applications</li>
                  <li>Performed in the role of Debug and Support technician focusing on the resolving of database data conflicts and the correction and enhancement of existing client database objects (procedures, views, etc.)</li>
                  <li>Became a functional expert on the Quorum TIPS application</li>
                  <li>Was deployed directly a client's site to help implement and transition a new project into the Quorum support hub, and provide direct support for existing Clients</li>
                  <li>Was assigned high profile issues and maintained them throughout their entire life cycle</li>
                  <li>Setup Demo environments and Presentations for Training</li>
                </ul>
                <div className="tech-stack">
                  <span className="tech-badge">Crystal Reports</span>
                  <span className="tech-badge">SQL</span>
                  <span className="tech-badge">Database Development</span>
                  <span className="tech-badge">Client Support</span>
                </div>
              </div>

              <div className="timeline-item">
                <h3>Help Desk Support</h3>
                <div className="timeline-meta">Texas A&M • Sep 2006 - May 2008</div>
                <ul>
                  <li>Provided one-on-one customer software support</li>
                  <li>Taught the usage of Group Decision Support Systems Software</li>
                  <li>Provided hardware trouble-shooting and diagnosis</li>
                  <li>Created clear and concise directions for various technical tasks</li>
                </ul>
                <div className="tech-stack">
                  <span className="tech-badge">Customer Support</span>
                  <span className="tech-badge">Technical Training</span>
                  <span className="tech-badge">Hardware Troubleshooting</span>
                </div>
              </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: '4rem', padding: '3rem 0', background: 'var(--ifm-background-surface-color)', borderRadius: '8px' }}>
              <h3 style={{ marginBottom: '1rem' }}>Want to Learn More?</h3>
              <p style={{ marginBottom: '2rem', color: '#555' }}>
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
