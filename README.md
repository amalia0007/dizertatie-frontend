Introduction
------------

Frontend app for 2023 dissertation thesis, done by Amalia Stefanescu.
<br/>
This is the frontend application for BIG-O , a simulated game rental platform.

Running locally
---------------

Make sure angular-cli is installed : `npm install -g angular@cli`
<br/>
If you have a Node version > 16, then run this command (in Powershell) : `$env:NODE_OPTIONS = "--openssl-legacy-provider`
<br/>
To start in dev-mode, run command `npm run start-dev`
<br/>


Deploying to Azure Portal
------------------------

For Node version > 16, run this command (in Powershell) : `$env:NODE_OPTIONS = "--openssl-legacy-provider`
<br/>
Perform a dist build on your local machine: `npm run build-prod`
<br/>
Then, run a Docker config, based on the Dockerfile in the project root (name the resulting image `amaliastefanescu/rentals-ui:latest`)
<br/>
Using Docker Desktop, push the resulting image into Docker Hub.
<br/>
Restart (or create from scratch) the Container Instance config in [Azure Portal](portal.azure.com), called `ci-rentals-ui` .
