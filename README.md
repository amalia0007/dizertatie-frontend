Introduction
------------

Frontend app for 2023 dissertation thesis, done by Amalia Stefanescu.
<br/>
This is the frontend application for BIG-O , a simulated game rental platform.

Running locally
---------------

Make sure angular-cli is installed : `npm install -g angular@cli`
<br/>
To start in dev-mode, run command `npm run start-dev`
<br/>
If you have a Node version > 16, then also run this (in Powershell): `$env:NODE_OPTIONS = "--openssl-legacy-provider`

Deploying to Azure Portal
------------------------

First, perform a dist build on your local machine: `npm run build-prod`
<br/>
Then, run a Docker config, based on the Dockerfile in the project root (name the resulting image amaliastefanescu/rentals-ui:latest)
<br/>
Using Docker Desktop, push the resulting image into Docker Hub.
<br/>
Restart (or create from scratch) the Container Instance config in Azure Portal, called ci-rentals-ui .
