# swa-nextjs-example

An example [Azure Static Web App](https://learn.microsoft.com/en-us/azure/static-web-apps/) that combines a [Next.js](https://nextjs.org/) web front end with a TypeScript REST API built on [Azure Functions](https://learn.microsoft.com/en-us/azure/azure-functions/). The API is served under the `/api` route through the Static Web Apps built-in proxy, and the whole app is deployed to Azure through GitHub Actions.

## Table of contents

- [How it works](#how-it-works)
- [Architecture](#architecture)
- [Tech stack](#tech-stack)
- [Repository layout](#repository-layout)
- [Prerequisites](#prerequisites)
- [Quick start](#quick-start)
- [Local development and debugging](#local-development-and-debugging)
- [Deployment](#deployment)

## How it works

The front end is a Next.js application in `src/webapp`. It renders a form that asks for a name and, on input, calls the REST API at `/api/hello/{name}` using [SWR](https://swr.vercel.app/) for data fetching. The API is a single HTTP-triggered Azure Function (`hello`) that echoes back a greeting as JSON.

Locally, the [Azure Static Web Apps CLI](https://github.com/Azure/static-web-apps-cli) emulates the production proxy: it serves the Next.js dev server and forwards `/api/*` requests to the Azure Functions host, so the same relative `/api` calls work both locally and in Azure with no configuration change.

## Architecture

```
Browser
  |
  |  HTTP
  v
Azure Static Web Apps  ── serves ──>  Next.js web app        (src/webapp)
        |
        |  proxies /api/*
        v
Azure Functions (REST API)           hello: GET/POST /api/hello/{name?}   (src/api)
```

| Component | Location | Responsibility |
| --- | --- | --- |
| Web app | `src/webapp` | Next.js UI; fetches `/api/hello/{name}` with SWR |
| REST API | `src/api` | Azure Functions HTTP trigger returning a JSON greeting |
| Static Web Apps proxy | Azure (and SWA CLI locally) | Routes `/api/*` to the Functions host so the front end uses relative URLs |

The `hello` function uses the Azure Functions v4 programming model (functions registered in code via `app.http(...)`, no `function.json`) and exposes the route `hello/{name?}`, which resolves to `/api/hello/{name}` behind the Static Web Apps proxy.

## Tech stack

Versions below reflect the current `package.json` files in this repository.

### Web app (`src/webapp`)

| Dependency | Version |
| --- | --- |
| Next.js | 16.x |
| React / React DOM | 19.x |
| TypeScript | 7.x |
| ESLint | 10.x (with `eslint-config-next` 16.x) |
| SWR | 2.x |
| `@types/node` | 26.x |

### REST API (`src/api`)

| Dependency | Version |
| --- | --- |
| `@azure/functions` | 4.x (v4 programming model) |
| TypeScript | 7.x |
| Azure Functions extension bundle | `[4.*, 5.0.0)` (see `host.json`) |

Both projects use npm as the package manager (each has its own `package.json` and `package-lock.json`).

## Repository layout

```
.
├── .github/workflows/   GitHub Actions workflow that deploys to Azure Static Web Apps
├── .vscode/             VS Code launch and task configuration for full-stack debugging
├── src/
│   ├── webapp/          Next.js web application
│   └── api/             TypeScript Azure Functions REST API
└── README.md
```

## Prerequisites

- [Node.js](https://nodejs.org/) 20 LTS or newer.
- [Azure Functions Core Tools v4](https://learn.microsoft.com/en-us/azure/azure-functions/functions-run-local): `npm install -g azure-functions-core-tools@4 --unsafe-perm true`.
- [Azure Static Web Apps CLI](https://github.com/Azure/static-web-apps-cli): `npm install -g @azure/static-web-apps-cli`. Required to run and debug the app locally with the `/api` proxy.
- [Visual Studio Code](https://code.visualstudio.com/) (optional) if you want one-key full-stack debugging.
- An [Azure](https://azure.microsoft.com/) subscription if you want to deploy your own instance.

## Quick start

```bash
# 1. Clone the repository
git clone https://github.com/josuemb/swa-nextjs-example.git
cd swa-nextjs-example

# 2. Install and build the API
cd src/api
npm install
npm run build

# 3. Install the web app dependencies
cd ../webapp
npm install

# 4. From the repository root, start everything through the SWA CLI
cd ../..
swa start http://localhost:3000 --run "npm run dev" --api-location http://localhost:7071 --app-location src/webapp
```

Then open the URL that the SWA CLI prints (by default http://localhost:4280). The web app is served through the emulated proxy and its `/api/hello/{name}` calls reach the local Functions host.

You can also run each piece on its own during development:

```bash
# Web app only (http://localhost:3000)
cd src/webapp && npm run dev

# API only (http://localhost:7071)
cd src/api && npm start
```

## Local development and debugging

This repository ships VS Code configuration for full-stack debugging (client and server together).

1. Open the repository root in VS Code.
2. Press F5, or go to Run > Start Debugging.

The launch configuration starts the Azure Functions host and the SWA CLI, then attaches the debugger so you can set breakpoints in both the Next.js components and the Azure Functions code. See [.vscode/launch.json](/.vscode/launch.json) and [.vscode/tasks.json](/.vscode/tasks.json) for the exact steps.

## Deployment

The app deploys to Azure Static Web Apps via GitHub Actions using the [Azure/static-web-apps-deploy](https://github.com/Azure/static-web-apps-deploy) action. See [.github/workflows/azure-static-web-apps-jolly-bush-0b2d76f10.yml](/.github/workflows/azure-static-web-apps-jolly-bush-0b2d76f10.yml).

The workflow is configured with:

| Setting | Value |
| --- | --- |
| App location | `/src/webapp` |
| API location | `/src/api` |
| Output location | `out` |

Deployment requires the `AZURE_STATIC_WEB_APPS_API_TOKEN_JOLLY_BUSH_0B2D76F10` repository secret (the deployment token for the target Static Web App). The workflow is currently set to run on `workflow_dispatch` only, so it is triggered manually from the Actions tab rather than on every push.

To create and deploy your own Static Web App, follow [Build your first static site with Azure Static Web Apps](https://learn.microsoft.com/en-us/azure/static-web-apps/get-started-portal), using the App, API, and Output locations from the table above, then supply your own deployment token as the repository secret referenced by the workflow.
