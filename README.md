# JectacularQl

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.5.3.

Please remember to always run `npm install` before running the code to ensure you're working with the latest specified tools, libraries and frameworks.

## Development

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
Insert QL code into the left of the application, press parse to make a form. Fill the form and press submit to see the results.

Example input can be found in src/parser/textQuestionnaires.txt and src/app/ql-mock-input.ts

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

Run `ng test --code-coverage` to execute unit tests and get a coverage report
(which can be found in coverage/index.html)

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Generating a new parser
Run `npm run genParserQl` to generate a new QL parser (for example if the grammar has changed)
Run `npm run genParserQls` to generate a new QLS parser (for example if the grammar has changed)

## Before committing
Run `npm run check` before committing to make sure the code is correct. It wil automatically generate a new parser, run linting and tests.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
