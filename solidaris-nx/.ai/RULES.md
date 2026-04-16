# RULES.md

## Project Management Rules

1. **Code Quality**: All code must adhere to the established coding standards and best practices. Use linters and formatters to maintain consistency.
  
2. **Version Control**: All changes must be committed to the repository with clear and descriptive commit messages. Use feature branches for new developments.

3. **Documentation**: Every component, service, and module must be documented. Update the README and other relevant documentation as necessary.

4. **Testing**: All new features must include unit tests and integration tests. Ensure that tests cover at least 80% of the codebase.

5. **Code Reviews**: All pull requests must be reviewed by at least one other developer before merging into the main branch.

6. **Continuous Integration**: Ensure that all builds pass in the CI pipeline before merging any changes. Monitor CI results and address any failures promptly.

7. **Dependency Management**: Regularly update dependencies to their latest stable versions. Use tools to check for vulnerabilities in dependencies.

8. **Design Consistency**: Follow the Plectrum design system for UI components. Ensure that all new components align with the design specifications.

9. **Performance Optimization**: Regularly review and optimize the performance of applications. Use profiling tools to identify bottlenecks.

10. **Accessibility**: Ensure that all applications meet accessibility standards. Regularly test for compliance with WCAG guidelines.

## Development Practices

- Use Angular best practices for component architecture and state management.
- Follow ITCSS for SCSS organization to maintain a scalable and manageable stylesheet structure.
- Apply BEMIT naming conventions for all CSS classes to ensure clarity and maintainability.
- Utilize Storybook for developing and testing UI components in isolation.
- Keep the project structure organized and intuitive for new developers joining the team.