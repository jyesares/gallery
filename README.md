# Gallery

This is a gellery of images showing recents photos uploaded to Flickr

## Getting Started

Please follow next instructions to have the project running

### Prerequisites

Project was created and developed with:

```
node@10.4.1
npm@6.1.0
react@16.4.1
yarn@1.7.1
```

Install these versions for compatibility

### Installing

First of all, clone this project into your directory

```
git clone http://github.com/jyesares/gallery.git
```

then enter to `gallery` folder and install packages

```
cd gallery
npm install
```

To run frontend react server for development mode, you must enter to client folder and install dependencies:

```
cd gallery/client
yarn install # or npm install
```

## Running in development mode

For running in local you should run backend instance and frontend instance in differents terminals.

### Backend

You must have an api key from flickr

In the root folder run:

```
API_KEY={api_key} npm run dev
```

Application backend will be running at localhost:3001

### Frontend

Open another terminal instance and enter to client directory and run

```
yarn start # or npm start
```

React script will manage the rest
Develpment server will be up and running add localhost:3000

For communication with backend, you can find a proxy setting into package.json

```
proxy: "https://localhost:3001"
```

### Usage

Enter to the browser at `http://localhost:3000`

## Running in production mode

You can run the application in production mode

At the root level of the project run

```
API_KEY={api_key} npm start
```

Frontend will be built and the output bundle required from backend.

### Usage

Enter into `http://localhost:3000` at your browser.

## Running the tests

Test are done with mocha, installed as a dependency.

```
API_KEY={api_key} npm test
```

## Deployment

For deployments, remind to set the API_KEY env var.

Use production mode.

## Authors

- **F. Javier Romero Yesares**

## Comments

- This gallery is not fully completed. It is under development.
