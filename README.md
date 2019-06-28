This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### Requirements

Running podcast server from http://localhost:1337

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.


# Left-out list

- Some global scss configuration
  - colors
  - units e.g 
    ```
      $unit-100: 4px;
      $unit-200: 8px;
      ...
      ...
      $unit-600: 40px;
    ```
  - media query mixin

- Use an actual icon package
- Create mobile styles
- Full test coverage of components
- End-to-end testing
  - In an ideal project I would write at least 1 automated test, triggering core functionality e.g Mock endpoint returns a mock list of podcasts, that can be clicked on, play and trigger the correct markers at the expected timestamps
