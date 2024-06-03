# Country Data Manager

This is a simple Country Management System application built with TypeScript for my class CS 601 O1 Assignment 4 at Boston University. The application allows you to filter and display information about various countries based on their unique properties, such as whether they are rainy, snowy, or island countries.

Side notes: most of the styles were adapted from the previous assignment 3.

## Table of Contents

- [Demo](#demo)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [File Structure](#file-structure)

## Demo

You can view the live demo of the portfolio [here](https://codepen.io/lest-xu/pen/vYwxqOP).

## Features

- Responsive design that works on various devices
- A clean and modern user interface
- Sections for countries, about me, and contact information
- Hover effects for interactive user experience
- Fetch country data from a remote JSON file.
- Display country information on the webpage.
- Filter countries by their type (rainy, snowy, island) using a dropdown menu.
- Clear the displayed country list before applying a new filter.

## Technologies Used

- HTML5
- CSS3
- Typescript
- Fetch API

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/lest-xu/bucs601a4.git

2. Navigate to the project directory:

   ```sh
   cd yourrepo/country-app

3. Install the TypeScript compiler and other dependencies:

   ```sh
   npm install

### Running the Application

1. Compile the TypeScript code:

   ```sh
   npx tsc

This will generate the corresponding `.js` file in the /public folder according to your `tsconfig.json` settings.

2. Open the `index.html` file in your favorite browser to see the results.

## Project Structure

`app.ts`: Main TypeScript file containing the application logic.
`index.html`: HTML file containing the structure of the webpage.
`style.css`: CSS file for basic styling.
`countries.json`: JSON file containing the list of countries.

## File Structure

The project directory contains the following files:

```
    country-app/
        node_modules/
        public/
            ├── app.js
            ├── app.js.map
            ├── countries.json
            ├── index.html
            ├── styles.css
        src/
            ├── app.ts
        ── package-lock.json
        ── package.json
        ── README.md
        ── tsconfig.json

