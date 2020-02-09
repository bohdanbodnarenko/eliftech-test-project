This is a test project for Elif Tech company

## Available Scripts

In the project directory, you can run:

### `docker-compose up`

Runs the both front-end and back-end with db.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Back-end 

Is located in back-end/ folder and contain an API for the project written on express and MongoDB, all routes are covered by tests

### `yarn test` in back-end/ dir

Runs all test in the back-end

## Front-end 

Is located in front-end/ folder and it's a basic react app with Redux and simple routing.

### `yarn start` in front-end/ dir

Starts front-end in dev mode

## .env files

### back-end
The structure should be same as in .env.docker file

### front-end
Should contain field REACT_APP_SERVER_URL
