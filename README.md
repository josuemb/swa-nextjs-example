# Description
This is an example of an [Azure Static Web App](https://docs.microsoft.com/en-us/azure/static-web-apps/) with next features:
* **Web Application:**
  * Made with [Next.js](https://nextjs.org/) version 12.X as the framework.
  * Rest frameworks uses [React JS](https://reactjs.org/) version 17.X under the hood.
  * It has been created with [Create Next App](https://nextjs.org/docs/api-reference/create-next-app).
  * It uses [Type Script](https://www.typescriptlang.org/) as language.
  * Components created as tsx files and lambda functions instead of classes.
* **REST API:**
  * It uses [Type Script](https://www.typescriptlang.org/) as language.
  * It runs in /api route thanks to the built-in proxy features of [Azure Static Web App](https://docs.microsoft.com/en-us/azure/static-web-apps/).
  * It is using route variables.
* **Other:**
  * Using [YARN](https://yarnpkg.com/) as the default package manager for improved performance.
  * Custom configuration to debug full stack (REST API and Client React components) with Visual Studio Code.
  * Using [GitHub Actions](https://github.com/features/actions) to deploy application to an [Azure Static Web App](https://docs.microsoft.com/en-us/azure/static-web-apps/).

## Getting Started
1. Clone this repository: https://github.com/josuemb/swa-nextjs-example.git.<br />
It could be done with:<br />
`git clone https://github.com/josuemb/swa-nextjs-example.git`
1. Install [Node.JS](https://nodejs.org/) last LTS version (16.14.0 at the moment I am writing this). <br />See instructions in: https://nodejs.dev/learn/how-to-install-nodejs.
1. Install [Yarn](https://yarnpkg.com/) as package manager. <br />See instructions in: https://yarnpkg.com/getting-started/install. <br/>**Important:** Starting from Node.JS ver >=16.10, the preferred way to manage [Yarn](https://yarnpkg.com/) is through [Corepack](https://nodejs.org/dist/latest/docs/api/corepack.html). <br />See more information in: https://nodejs.org/dist/latest/docs/api/corepack.html. <br />See instructions to enable on: https://nodejs.org/dist/latest/docs/api/corepack.html#enabling-the-feature.
1. Install [Azure Functions Core Tools](https://docs.microsoft.com/en-us/azure/azure-functions/functions-run-local). <br />See: https://github.com/Azure/azure-functions-core-tools/blob/master/README.md#windows. <br />Please install as a global tool using [Yarn](https://yarnpkg.com/) with command:<br/>` 
yarn global add azure-functions-core-tools@3`.<br/> **Important:** The last version available at the moment I am writing this is version 3.
1. Install [Azure Static Web Apps CLI](https://github.com/Azure/static-web-apps-cli). See: https://github.com/Azure/static-web-apps-cli. <br />Please install as a global tool using [Yarn](https://yarnpkg.com/) with command:<br/>` 
yarn global add @azure/static-web-apps-cli`.<br/> **Important:** The last version available at the moment I am writing this is version 0.8.2. This version still as preview and it is essential to run and debug the application locally.
1. Install [Visual Studio Code](https://code.visualstudio.com/) if you want to debug the application. <br />See: https://code.visualstudio.com/docs/setup/setup-overview.

## Debugging
Once you have cloned the repository there is all ready to debug on Visual Studio code. You can just press F5 key or go to Run > Start Debugging menu.<br />
It will debug both: Client and Server.
If you want to see how it could be done.<br />
See [launch.json](/.vscode/launch.json)

## Deploying
See how to deploy the Azure Static Web Application in: https://docs.microsoft.com/en-us/azure/static-web-apps/get-started-portal?tabs=vanilla-javascript.<br />Use next parameters:<br />
**App Location:** /src/webapp<br />
**Api Location:** /src/api<br />
**Artifact location:** out<br />
See how I did it in: [azure-static-web-apps-jolly-bush-0b2d76f10.yaml](/.github/workflows/azure-static-web-apps-jolly-bush-0b2d76f10.yml)<br />
See running example in: https://jolly-bush-0b2d76f10.1.azurestaticapps.net/