export const projects = [
  {
    id: 'gitlab-cicd-pipeline',
    title: 'GitLab CI/CD Pipeline',
    description: 'Production-ready CI/CD pipeline demonstrating automated build, test, and deployment workflows using GitLab. Features Docker containers, intelligent caching strategies, artifact management, code coverage reporting, and automated GitLab Pages deployment.',
    overview: 'This project demonstrates a production-ready CI/CD pipeline built with GitLab CI/CD, showcasing automated build, test, and deployment workflows. The pipeline implements industry best practices for continuous integration and continuous deployment, including Docker containerization, intelligent caching, artifact management, and automated testing with code coverage reporting.',
    technologies: ['GitLab CI/CD', 'Docker', 'Node.js', 'Jest', 'DevOps', 'Automation', 'YAML'],
    githubUrl: 'https://gitlab.com/kristina-portfolio/gitlab-cicd-pipeline-example',
    link: '/projects/gitlab-cicd-pipeline',
    featured: true
  },
  {
    id: 'packer-demos',
    title: 'Packer Demos',
    description: 'Demonstrations and examples of using HashiCorp Packer for creating machine images across multiple platforms. Includes examples for AWS, Azure, VMware, and more with best practices for image building and CI/CD integration.',
    overview: 'This project contains demonstrations and examples of using HashiCorp Packer for creating machine images across multiple platforms. Packer is an open-source tool for creating identical machine images for multiple platforms from a single source configuration.',
    technologies: ['Packer', 'HCL', 'Infrastructure as Code', 'Automation', 'DevOps'],
    githubUrl: 'https://github.com/ForeverAProgrammer/demos_packer',
    link: '/projects/packer-demos',
    featured: true
  },
  {
    id: 'mermaid-demos',
    title: 'Mermaid Demos',
    description: 'Collection of Mermaid diagram examples showcasing different chart types and visualization techniques. Includes flowcharts, sequence diagrams, Gantt charts, class diagrams, state diagrams, and entity relationship diagrams.',
    overview: 'This project showcases various Mermaid diagram types and visualization techniques. Mermaid is a JavaScript-based diagramming and charting tool that uses Markdown-inspired text definitions to create and modify diagrams dynamically.',
    technologies: ['Mermaid', 'Markdown', 'JavaScript', 'Documentation', 'Visualization'],
    githubUrl: 'https://github.com/ForeverAProgrammer/demos_mermaid',
    link: '/projects/mermaid-demos',
    featured: true
  }
];

// Get all projects
export const getAllProjects = () => projects;

// Get only featured projects
export const getFeaturedProjects = () => projects.filter(p => p.featured);

// Get project by ID
export const getProjectById = (id) => projects.find(p => p.id === id);
