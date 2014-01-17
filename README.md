crs-frontend
============

Frontend for the class registration system.

To run the app:

1. Clone the project and navigate into its directory.
2. Make sure you have node.js installed:

  ```
  node --version
  ```

3. Run the server like this (you'll probably want to do this in a different terminal tab/window):

  ```
  node ./scripts/web-server.js
  ```

4. The app is now running at [http://localhost:8000/app/index.html](http://localhost:8000/app/index.html).

To run the tests:

1. Tests use [Karma](http://karma-runner.github.io/0.10/index.html). Ensure you have all necessary plugins for Karma using this command:

  ```
  npm install
  ```

2. Start the Karma server (from crs-frontend directory, probably in a different terminal tab/window):

  ```
  ./scripts/test.sh
  ```

3. It'll open up a browser window -- just ignore it and leave it running in the background. You can leave the Karma server running, and it'll watch your js files and run the tests whenever there's a change.