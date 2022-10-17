# This is a Mercurius Federation Info Graphiql Plugin

## Pre-requirements

Run `npm i` to install all the packages

## Running locally

You need to start the server of mercurius on port `3001` and not set the property `graphiql` or set it to `false`.
Run `npm start` that will start the development server.
Now the application is running on `http://localhost:3000` and will access the mercurius server on `http://localhost:3001`

### Development notes

If you need an example API for local testing and development, clone `https://github.com/nearform/mercurius-federation-info` which containes some example data. After the mentioned repo is cloned and its dependencies are installed by running `npm i`, you can start a mercurius server by running `npm run example`. It will start the development server on port `3001`.

## Next steps (as of 14th Oct 2022)

Currently the queries, mutations and object entites are parsed from the federation schema. The subscriptions and enumarations still need to be parsed and rendered. Currently the example from `nearform/mercurius-federation-info` repo does not cover those areas.

Also all error handling is silent, there is no feedback to the user if the data received from the mercurius server is malformed or has missing object keys.

There are no tests at the moment for rendering.
