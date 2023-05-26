<img src="https://raw.githubusercontent.com/ggar46/mindfulmilestones/main/client/src/assets/braingrey.png" width=100% alt="logoimage" />

#  Mindful Milestones

## About The Project

 Mindful Milestones is a vision board app that helps  turn goals into actionable steps. Users can save images that inspire, motivate, or represent their dreams and aspirations, and then use them to create a visual representation of their goals. Once the user creates a vision board, they can turn their goals into actionable steps by breaking them down into tasks.

[Live Project Page Link](https://server-tifo.onrender.com)

[![GitHub Pull Request](https://img.shields.io/github/issues-pr-closed/ggar46/mindfulmilestones)](https://github.com/ggar46/mindfulmilestones/pulls)
[![GitHub repo size](https://img.shields.io/github/repo-size/ggar46/mindfulmilestones)](https://github.com/ggar46/mindfulmilestones/)
[![GitHub contributors](https://img.shields.io/github/contributors/ggar46/mindfulmilestones)](https://github.com/ggar46/mindfulmilestones/)

## Table of Contents

- [Built With](#Built-With)
- [Installation](#installation)
- [Mock User](#Mock-User)
- [User Flow](#User-Flow)
- [Contact Information](#Contact-Information)
- [Acknowledgements](#acknowledgements)

## Built With 
<table align="center">
  <tr>
    <td align="center" width="96">
        <img src="https://user-images.githubusercontent.com/74997368/168923681-ece848fc-5700-430b-957f-e8de784e9847.png" width="48" height="48" alt="html" />
      <br>html
    </td>
    <td align="center" width="96">
        <img src="https://user-images.githubusercontent.com/74997368/168924521-589f95da-069a-496a-bcc1-ee6dd132ff12.png" width="48" height="48" alt="CSS" />
      <br>CSS
    </td>
    <td align="center" width="96">
        <img src="https://user-images.githubusercontent.com/74997368/168977094-6a5073a2-2f48-4f5a-ae0e-ed1421a678c6.png" width="48" height="48" alt="JavaScript" />
      <br>JavaScript
    </td>
    <td align="center" width="96">
        <img src="https://user-images.githubusercontent.com/74997368/168976819-15a1f4e0-29cf-4ac0-94a7-1f15eee374a1.png" width="48" height="48" alt="postgreSQL" />
      <br>postgreSQL
    </td>
    <td align="center" width="96">
        <img src="https://user-images.githubusercontent.com/74997368/168978951-5ac2af5e-c911-4e59-b493-683071cf1860.png" width="48" height="48" alt="Express" />
      <br>Express
    </td>
    <td align="center" width="96">
        <img src="https://user-images.githubusercontent.com/74997368/168979311-4a486cad-32c8-46f4-a5da-912fdc51b2d6.png" width="48" height="48" alt="React" />
      <br>React
    </td>
    <td align="center" width="96">
        <img src="https://user-images.githubusercontent.com/74997368/168979848-733f7090-0f78-401a-9ceb-4267231abef7.png" width="48" height="48" alt="Node" />
      <br>Node
    </td>
    <td align="center" width="96">
        <img src="https://user-images.githubusercontent.com/74997368/168980647-1690f9de-bf0e-4318-93cb-1b2ba3701ded.png" width="48" height="48" alt="Bootstrap" />
      <br>Bootstrap
    </td>
    <td align="center" width="96">
        <img src="https://pbs.twimg.com/profile_images/1337188620222906368/oNKK_fVe_400x400.jpg" width="48" height="48" alt="Render" />
      <br>Render
    </td>
  </tr>
</table>

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

## Mock User

[Live Project Page Link](https://server-tifo.onrender.com)

```bash
  username: testing@email.com
  password: Pw.246810
```

## User Flow


Click "Here" to enter authentification page.

<img src="https://raw.githubusercontent.com/ggar46/mindfulmilestones/new-images/client/src/assets/SS1.png" width=100% alt="step1" />


Enter test user email and password, then click "continue".

<img src="https://raw.githubusercontent.com/ggar46/mindfulmilestones/new-images/client/src/assets/SS2.png" width=100% alt="step2" />


Click "Add new Image" to open image search bar.

<img src="https://raw.githubusercontent.com/ggar46/mindfulmilestones/new-images/client/src/assets/SS3.png" width=100% alt="step3" />


Enter a word or phrase to choose from image results.

<img src="https://raw.githubusercontent.com/ggar46/mindfulmilestones/new-images/client/src/assets/SS4.png" width=100% alt="step4" />


Select 1 or more images to add to the vision board.

<img src="https://raw.githubusercontent.com/ggar46/mindfulmilestones/new-images/client/src/assets/SS5.png" width=100% alt="step5" />


The home page should now display the images. Click on the "x" to remove an image if necessary.

<img src="https://raw.githubusercontent.com/ggar46/mindfulmilestones/new-images/client/src/assets/SS6.png" width=100% alt="step6" />


In the navigation bar, click "Goals" to access all saved goals. The page will appear empty with a single button. Click the "Add Goal" button to submit a new goal.

<img src="https://raw.githubusercontent.com/ggar46/mindfulmilestones/new-images/client/src/assets/SS7.png" width=100% alt="step7" />


Fill out all areas in the form to submit. Select an image from the vision board by selecting from the dropdown options.

<img src="https://raw.githubusercontent.com/ggar46/mindfulmilestones/new-images/client/src/assets/SS8.png" width=100% alt="step8" />


The goal post should display on the page. Click "Goal Info" to review goal information and tasks.

<img src="https://raw.githubusercontent.com/ggar46/mindfulmilestones/new-images/client/src/assets/SS9.png" width=100% alt="step9" />


Add a new task by submitting the form entry in each search bar and clicking "Submit". Check the boxes as the tasks are completed. Press the red button to remove tasks if needed.

<img src="https://raw.githubusercontent.com/ggar46/mindfulmilestones/new-images/client/src/assets/SS10.png" width=100% alt="step10" />


A completed task counter is displayed on each goal card.

<img src="https://raw.githubusercontent.com/ggar46/mindfulmilestones/new-images/client/src/assets/SS11.png" width=100% alt="step11" />

## Contact Information

Thank you for visiting! I appreciate your interest in my work. If you have any comments, questions, or would like to connect, please feel free to reach out to me on [LinkedIn](www.linkedin.com/in/gisselle-garcia).

## Acknowledgements
Thank you to the [Techtonica](https://github.com/Techtonica) staff for the opportunity. I would also like to give thanks to [Ruby](https://github.com/rubycmarroquin), [Anneice](https://github.com/AnneiceManz), and [Sarah](https://github.com/sarahtech2022) for their support and encouragement. Special thanks to my mentors, [Arianna](https://github.com/adigreg) and [Karan](https://github.com/Adwitiya-Singh), for their guidance and mentorship throughout my journey. I am grateful for their expertise and belief in my abilities.

