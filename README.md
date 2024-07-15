This repository contains the updated code of a [tech task](https://github.com/Social-Pro/tech-task). It is built using React + TypeScript, bootstrapped with CRA. It uses Material UI component library, Formik for the form toolchain and Yup for form validation.

## Getting Started

First, run the development server (using pnpm or your choice of package manager):

```bash
npm i
npm run start
```

Then follow the displayed instructions to display the local app on your browser.

### Git

We use conventional commits. For more information you can check out the [Conventional Commit Homepage](https://www.conventionalcommits.org/en/v1.0.0/).

We follow a development branch naming convention: `<work type>/<issue-number>-<short-description>`

1. Start clasifying by work type. Examples: bugfix, feature, rebase, hotfix, docs, release, refactor.
2. Use dashes - to separate words.
3. Include related issue number (if any).
4. Describe the topic using two or three words.

### API Layer

There are simulated async awaits using timers that serve as stand-ins for actual third-party calls, allowing us to mimic a real-world environment.

### Styling

This repository uses Emotion, closely basing a styleguide from mui and customized as needed. We (try to) use an 8 point grid system for layout, dimensions, padding, and margin of elements.

### Testing

Testing will be implemented in the future, using Jest and React-Testing-Library and possibly Storybook for cautious regression testing.
