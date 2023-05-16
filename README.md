#  Mindful Milestones

## About The Project

 Mindful Milestones is a vision board app that helps  turn goals into actionable steps. Users can save images that inspire, motivate, or represent their dreams and aspirations, and then use them to create a visual representation of their goals. Once the user creates a vision board, they can turn their goals into actionable steps by breaking them down into tasks.

![Placeholder for Live Project Page Link](http://localhost:8080/)

[![GitHub Pull Request](https://img.shields.io/github/issues-pr-closed/ggar46/mindfulmilestones)](https://github.com/ggar46/mindfulmilestones/pulls)
[![GitHub repo size](https://img.shields.io/github/repo-size/ggar46/mindfulmilestones)](https://github.com/ggar46/mindfulmilestones/)
[![GitHub contributors](https://img.shields.io/github/contributors/ggar46/mindfulmilestones)](https://github.com/ggar46/mindfulmilestones/)

## Table of Contents

- [Built With](#Built-With)
- [Installation](#installation)
- [Acknowledgements](#acknowledgements)
- [Resources](#resources)

## Built With 
- ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
- ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
- [![React][React.js]][React-url]
- ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
- ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
- [![Bootstrap][Bootstrap.com]][Bootstrap-url]

## Installation

First you need to get [Auth0 API](https://auth0.com/), [Pexels API](https://www.pexels.com/api/)

Clone the project repository

```bash
git clone https://github.com/ggar46/mindfulmilestones.git
```
Access project repo

```bash
cd mindfulmilestones
```
Remove owner git from the main directory using

```bash
rm -rf .git
```

While still within the main directory in your terminal, run the command git init to start your own git 

```bash
git init
```

Access server.js file and install dependencies.

```bash
cd server
npm install
```
Create a `.env` file in your server file and enter your Auth0 credential.

```bash
cd server
touch .env
```
Restore the Postgres Database file in the project by running the following command to restore the database file the project already contains

```bash
psql postgres -f db.sql
```

```bash
psql postgres -f db.sql
```
<!-- continue later -->
Open another terminal then cd into the client, install dependencies

```bash
cd client
npm install
```

Start the browser

```bash
npm start
```
Note:
Server runs on http://localhost:8080 and client on http://localhost:5173
