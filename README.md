# sample-demo-app

A small, local task-board web app for practicing Playwright. The app has starter tasks and supports adding, completing, filtering, searching, and deleting tasks. It runs with Node.js built-ins and has no extra runtime dependencies.

## Getting started

### Prerequisites

- Node.js 18+
- npm

### Install dependencies

```bash
npm install
npx playwright install
```

### Run the app

```bash
npm start
```

Open [http://127.0.0.1:4173](http://127.0.0.1:4173). The task board keeps changes in memory, so reloading restores the starter tasks.

### Run the tests

```bash
npm test
```

Playwright starts the local app automatically for test runs. To watch the browser while tests run:

```bash
npm run test:headed
```
