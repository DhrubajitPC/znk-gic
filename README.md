# Employee crud take home assessment

## Introduction

This work is for a take home assessment. The original question can be found at "Frontend Test v2.4.1.pdf"

## Running the app

This project is set up using [Bun](https://bun.sh/). Install it on your machine.

```bash
curl -fsSL https://bun.sh/install | bash
```

Install the required packages

```bash
bun install
```

Next we need to start the mock server. This project is using the [json-server](https://github.com/typicode/json-server) library to set up crud endpoints.

```bash
bun run mock-api
```

Time to load and start our application

```bash
bun run dev
```

## Testing

Once the application is up and running, you can run unit tests by running

```bash
bun run test:unit
```

and e2e tests by running. Take note that the mock-api server must be running in the background for the e2e tests to pass.

```bash
bun run test:e2e
```

## Tech stack

This project is set up using vite with typescript. I am using the technologies suggested by the requirements.
For UI, I am using ant design. For state management I am using redux-toolkit. For api calls I am using RTK query. For form managment, I am using react-hook-form and I am supporting it with zod for simpler validation. For navigation, I am using react-router.

## Design choices

### Handling errors

In my App.tsx file I listen for any errors in my redux state before showing a modal to the user to inform them of any errors. This way I do not have to set up a separate error component to render on individual parts of my application and keep things simple. Any place that an error can happen, I dispatch an action to redux to update this error state.

### Root layout

I set up a root layout that can persist across pages. This is based on the assumption that all our pages will have the same default layout.

### Form validation

I use zod to handle form validation. By using it, I can have an isolated schema with all the validation rules making it easier to manage any form validation.

### Handling navigation block when an employee edit form has been updated

I created a wrapper around the <Link> component provided by react-router. I use a similar pattern to how I handle errors. I use the redux library as an event bus. Any part of my application can choose to dispatch an action to update my redux navigation state. In my App.tsx, I listen for any changes to this state and display a modal to prevent user navigation if needed.

This approach allows me to easily use this navigation prevention feature outside the edit-form page.

### E2E tests

I am using playwright for my e2e test. For this small application, I decided to run the tests in serial mode to keep the tests small and fast.
