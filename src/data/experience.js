export const experiences = [
  {
    id: 'itential',
    title: 'Software Engineer',
    company: 'Itential',
    period: 'Jul 2018 - Present',
    description: 'Network automation company providing solutions for enterprise IT infrastructure management. Career progression through multiple roles from Network Automation Engineer to current Software Engineer role.',
    overview: 'Network automation company providing solutions for enterprise IT infrastructure management. Career progression through multiple roles:',
    roles: [
      'Network Automation Engineer - Developed automation solutions for network infrastructure',
      'Software Architecture/Team Lead on Customer Projects - Designed custom React, Angular, and AngularJS applications for customers and led customer project delivery',
      'Manager, Internal Tools Department - Managed team building internal automation and productivity tools',
      'Testing and Release Engineer (DevOps Engineer) - Built CI/CD pipelines, managed UAT environments, and automated release processes',
      'Software Engineer - Full-stack development working on the Itential Automation Platform (IAP/P6) product'
    ],
    achievements: [
      'Developed automation solutions for network infrastructure',
      'Designed custom React, Angular, and AngularJS applications for customers',
      'Built CI/CD pipelines, managed UAT environments, and automated release processes',
      'Full-stack development on the Itential Automation Platform (IAP/P6) product'
    ],
    technologies: ['React', 'Angular', 'Node.js', 'CI/CD', 'DevOps', 'Network Automation'],
    featured: true
  },
  {
    id: 'clearcorrect',
    title: 'Software Engineer',
    company: 'ClearCorrect',
    period: 'Mar 2012 - Jul 2018',
    description: 'Led full-stack development of responsive web applications with 3D model visualization, managed SQL Server databases, and implemented JIRA workflows for the development team.',
    details: {
      'Web Development': [
        'Developed and maintained a responsive website that displays 3D models using jQuery, AJAX, JavaScript, CSS and HTML5 with different views on mobile and desktop devices',
        'Developed and maintained websites using ASP.NET, VB.NET, jQuery, JavaScript, AJAX, CSS and HTML5',
        'Worked directly with the Product Architect to develop new features and enhancements',
        'Designed and developed a job scheduler for an ASP.NET website'
      ],
      'Application Development': [
        'Maintained a C# desktop application that controls a Laser Marker',
        'Refactored existing code to enhance performance, reliability, and maintainability',
        'Diagnosed and resolved problems arising from trimmer machines running software written in C#',
        'Diagnosed and resolved problems arising from C++ 3D software'
      ],
      'Database': [
        'Supported multiple database modifications and development to multiple Microsoft SQL Server databases',
        'Identified and resolved problems with the databases such as poorly performing queries, missing foreign keys, identifying queries that are causing deadlocks and missing indexes',
        'Spearheaded the creation of a reporting database to reduce the load on the production database and improve the production database performance'
      ],
      'JIRA': [
        'Assisted with the administration of Atlassian tools',
        'Setup JIRA for tracking enhancements, bugs and Help Desk requests',
        'Created and maintained JIRA workflows for the Software Development department',
        'Integrated JIRA with HipChat and BitBucket',
        'Created and managed security schemes, permission schemes and configurations',
        'Managed and administered JIRA/BitBucket add-ons, plugins, and extensions'
      ],
      'Help Desk': [
        'Migrated the Help Desk from JitBit to Zendesk',
        'Managed Tier 1, Tier 2 and Tier 3 Help Desk using JitBit, JIRA and Zendesk',
        'Integrated Zendesk with an ASP.NET site so that users can log Help Desk tickets from within the site'
      ]
    },
    achievements: [
      'Built responsive 3D model viewer with jQuery and HTML5',
      'Created reporting database to improve production performance',
      'Integrated Zendesk Help Desk with ASP.NET applications'
    ],
    technologies: ['ASP.NET', 'C#', 'JavaScript', 'SQL Server', 'JIRA'],
    featured: true
  },
  {
    id: 'quorum-senior',
    title: 'Senior Consultant',
    company: 'Quorum Business Solutions',
    period: 'Dec 2010 - Jan 2012',
    description: 'Led support team for enterprise software solutions, mentored junior developers, and worked directly with clients to deliver custom C++ enhancements.',
    details: {
      'Midstream Support Hub': [
        'Led a small team in charge of solving client application specific issues',
        'Served as an assistant Business Liaison for Client Support issues',
        'Became the Technical Expert in the Support Hub charged with providing training for junior consultants in how to use and understand the TIPS application code and other database structures',
        'Completed multiple smaller client oriented projects with a 100% satisfaction rate',
        'Approved issue estimates for the Support Hub in order to guarantee that issues were being completed in a timely manner, within budget, and that the estimates from the developers were both reasonable and realistic',
        'Served as a Mentor to Junior Employees for direct training and support',
        'Prepared and executed test cases to ensure proper configuration of TIPS',
        'Prepared configuration documentation for Clients, explaining in detail their current TIPS configuration with the data provided'
      ],
      'Core Team Developer': [
        'Used C++ to debug the TIPS application code and make enhancements based on specific client requests and designs',
        'Worked directly with the Project Architect to develop new features and enhancements',
        'Refactored existing code to enhance performance, reliability, and maintainability'
      ]
    },
    achievements: [
      'Led team solving client application issues with 100% satisfaction',
      'Trained junior consultants on application architecture',
      'Worked with Project Architect on new feature development'
    ],
    technologies: ['C++', 'SQL', 'TIPS', 'Team Leadership'],
    featured: true
  },
  {
    id: 'quorum-consultant',
    title: 'Consultant',
    company: 'Quorum Business Solutions',
    period: 'Jul 2008 - Nov 2010',
    description: 'Developed Crystal Reports and performed database debugging and support for Quorum TIPS, QCM, and QDOD applications.',
    responsibilities: [
      'Developed and Repaired Crystal Reports for the Quorum TIPS, QCM, and QDOD applications',
      'Performed in the role of Debug and Support technician focusing on the resolving of database data conflicts and the correction and enhancement of existing client database objects (procedures, views, etc.)',
      'Became a functional expert on the Quorum TIPS application',
      'Was deployed directly a client\'s site to help implement and transition a new project into the Quorum support hub, and provide direct support for existing Clients',
      'Was assigned high profile issues and maintained them throughout their entire life cycle',
      'Setup Demo environments and Presentations for Training'
    ],
    technologies: ['Crystal Reports', 'SQL', 'Database Development', 'Client Support'],
    featured: false
  },
  {
    id: 'tamu',
    title: 'Help Desk Support',
    company: 'Texas A&M',
    period: 'Sep 2006 - May 2008',
    description: 'Provided technical support and training for Group Decision Support Systems Software.',
    responsibilities: [
      'Provided one-on-one customer software support',
      'Taught the usage of Group Decision Support Systems Software',
      'Provided hardware trouble-shooting and diagnosis',
      'Created clear and concise directions for various technical tasks'
    ],
    technologies: ['Customer Support', 'Technical Training', 'Hardware Troubleshooting'],
    featured: false
  }
];

// Get all experiences
export const getAllExperiences = () => experiences;

// Get only featured experiences (for home page highlights)
export const getFeaturedExperiences = () => experiences.filter(e => e.featured);

// Get experience by ID
export const getExperienceById = (id) => experiences.find(e => e.id === id);
