const express = require('express');
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const db = require('./db/db-connection.js');


const app = express();
const PORT = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());

// creates an endpoint for the route "/""
app.get('/', (req, res) => {
    res.json({ message: 'Hola, from My template ExpressJS with React-Vite' });
});


//*************************************************************************************************************************************** */

// GET request for IMAGE_TRACKER in the endpoint '/api/images' (works)
app.get('/api/images', async (req, res) => {
    try {
        const { rows: image_tracker } = await db.query('SELECT * FROM image_tracker');
        res.send(image_tracker);
    } catch (e) {
        return res.status(400).json({ e });
    }
});


// GET request for TASK_TRACKER in the endpoint '/api/tasks' (works)
app.get('/api/tasks', async (req, res) => {
    try {
        const { rows: task_tracker } = await db.query('SELECT * FROM task_tracker');
        res.send(task_tracker);
    } catch (e) {
        return res.status(400).json({ e });
    }
});

// GET request for GOAL_INFO in the endpoint '/api/goals' (works)
app.get('/api/goals', async (req, res) => {
    try {
        const { rows: goal_info } = await db.query('SELECT * FROM goal_info');
        res.send(goal_info);
    } catch (e) {
        return res.status(400).json({ e });
    }
});

// GET request for USER_TABLE in the endpoint '/api/users' (works)
app.get('/api/users', async (req, res) => {
    try {
        const { rows: user_table } = await db.query('SELECT * FROM user_table');
        res.send(user_table);
    } catch (e) {
        return res.status(400).json({ e });
    }
});

//*************************************************************************************************************************************** */

// DELETE request for IMAGE_TRACKER in the endpoint '/api/images', REMOVED BECAUSE IF DELETE IMAGE AND SELECTED ONE FOR A GOAL, WHEN YOU DELETE AN IMAGE THERE IS NOW AN ERROR WITH THE GOAL'S IMAGE
// app.delete('/api/images/:imageId', async (req, res) => {
//     try {
//         const imageId = req.params.imageId;
//         await db.query('DELETE FROM image_tracker WHERE image_url=$1', [imageId]);
//         console.log("From the delete request-url", imageId);
//         res.status(200).end();
//     } catch (e) {
//         console.log(e);
//         return res.status(400).json({ e });

//     }
// });

// DELETE request for TASK_TRACKER in the endpoint '/api/tasks' (works)
app.delete('/api/tasks/:taskId', async (req, res) => {
    try {
        const taskId = req.params.taskId;
        await db.query('DELETE FROM task_tracker WHERE id=$1', [taskId]);
        console.log("From the delete request-url", taskId);
        res.status(200).end();
    } catch (e) {
        console.log(e);
        return res.status(400).json({ e });

    }
});


// DELETE request for GOAL_INFO in the endpoint '/api/goals' (works)
app.delete('/api/goals/:goalId', async (req, res) => {
    try {
        const goalId = req.params.goalId;
        await db.query('DELETE FROM goal_info WHERE id=$1', [goalId]);
        console.log("From the delete request-url", goalId);
        res.status(200).end();
    } catch (e) {
        console.log(e);
        return res.status(400).json({ e });

    }
});

//*************************************************************************************************************************************** */

// PUT request for GOAL_INFO in the endpoint '/api/goals', no editing id/user (works)
app.put('/api/goals/:goalId', async (req, res) =>{
    //console.log(req.params);
    //This will be the id that I want to find in the DB - the goal to be updated
    const goalId = req.params.goalId
    const updatedGoal = { image_fkey: req.body.image_fkey, date: req.body.date, goal_purpose: req.body.goal_purpose, goal_obstacle: req.body.goal_obstacle, strategy: req.body.strategy, goal: req.body.goal}
    console.log("In the server from the url - the goal id", goalId);
    console.log("In the server, from the react - the goal to be edited", updatedGoal);
    const query = `UPDATE goal_info SET image_fkey=$1, date=$2, goal_purpose=$3, goal_obstacle=$4, strategy=$5, goal=$6 WHERE id=${goalId} RETURNING *`;
    const values = [updatedGoal.image_fkey, updatedGoal.date, updatedGoal.goal_purpose, updatedGoal.goal_obstacle, updatedGoal.strategy, updatedGoal.goal];
    try {
      const updated = await db.query(query, values);
      console.log(updated.rows[0]);
      res.send(updated.rows[0]);
  
    }catch(e){
      console.log(e);
      return res.status(400).json({e})
    }
  })

// PUT request for image instead of delete?

//*************************************************************************************************************************************** */

// POST request IMAGE_TRACKER (works)
app.post('/api/images', async (req, res) => {
    try {
        const newImage = {
            image_url: req.body.image_url,
            user_fkey: req.body.user_fkey,
            alt_text: req.body.alt_text
        };
        const result = await db.query(
            'INSERT INTO image_tracker(image_url, user_fkey, alt_text) VALUES($1, $2, $3) RETURNING *',
            [newImage.image_url, newImage.user_fkey, newImage.alt_text],
        );
        console.log(result.rows[0]);
        res.json(result.rows[0]);

    } catch (e) {
        console.log(e);
        return res.status(400).json({ e });
    }

});

// POST request TASK_TRACKER (works)
app.post('/api/tasks', async (req, res) => {
    try {
        const newTask = {
            goal_fkey: req.body.goal_fkey,
            task_text: req.body.task_text,
        };
        const result = await db.query(
            'INSERT INTO task_tracker(goal_fkey, task_text) VALUES($1, $2) RETURNING *',
            [newTask.goal_fkey, newTask.task_text],
        );
        console.log(result.rows[0]);
        res.json(result.rows[0]);

    } catch (e) {
        console.log(e);
        return res.status(400).json({ e });
    }

});

// POST request GOAL_INFO (works)
app.post('/api/goals', async (req, res) => {
    try {
        const newGoal = {
            user_fkey: req.body.user_fkey,
            image_fkey: req.body.image_fkey,
            date: req.body.date,
            goal_purpose: req.body.goal_purpose,
            goal_obstacle: req.body.goal_obstacle,
            strategy: req.body.strategy,
            goal: req.body.goal
        };
        const result = await db.query(
            'INSERT INTO goal_info(user_fkey, image_fkey, date, goal_purpose, goal_obstacle, strategy, goal) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [newGoal.user_fkey, newGoal.image_fkey, newGoal.date, newGoal.goal_purpose, newGoal.goal_obstacle, newGoal.strategy, newGoal.goal],
        );
        console.log(result.rows[0]);
        res.json(result.rows[0]);

    } catch (e) {
        console.log(e);
        return res.status(400).json({ e });
    }

});

// POST request USER_TABLE??? wait until auth0 we might get user from that, post names

//*************************************************************************************************************************************** */

// API GET request for PEXELS IMAGES in the endpoint '/api/pexels'

// app.get("/api/pexels/:userSearchedImage", (req, res) => {
//     console.log("code reached api function");
//     const requestedImage = req.params.userSearchedImage;
    
//     // fetch(`https://api.openweathermap.org/data/2.5/weather?q=${requestedCity}&appid=df4dc696102dd6129092d84b487c1aaa&units=imperial`)
//     fetch(`https://api.pexels.com/v1/search?query=${requestedImage}&per_page=3`)
//       .then(async (data) => {
//       const requestedImages = await data.json();
//       res.json(requestedImages);
//   });
// });
  


//API MOCK DATA
// {
//     "page": 1,
//     "per_page": 3,
//     "photos": [
//         {
//             "id": 15286,
//             "width": 2500,
//             "height": 1667,
//             "url": "https://www.pexels.com/photo/person-walking-between-green-forest-trees-15286/",
//             "photographer": "Luis del Río",
//             "photographer_url": "https://www.pexels.com/@luisdelrio",
//             "photographer_id": 1081,
//             "avg_color": "#283419",
//             "src": {
//                 "original": "https://images.pexels.com/photos/15286/pexels-photo.jpg",
//                 "large2x": "https://images.pexels.com/photos/15286/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
//                 "large": "https://images.pexels.com/photos/15286/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=650&w=940",
//                 "medium": "https://images.pexels.com/photos/15286/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350",
//                 "small": "https://images.pexels.com/photos/15286/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=130",
//                 "portrait": "https://images.pexels.com/photos/15286/pexels-photo.jpg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
//                 "landscape": "https://images.pexels.com/photos/15286/pexels-photo.jpg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
//                 "tiny": "https://images.pexels.com/photos/15286/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280"
//             },
//             "liked": false,
//             "alt": "Person Walking Between Green Forest Trees"
//         },
//         {
//             "id": 3408744,
//             "width": 3546,
//             "height": 2255,
//             "url": "https://www.pexels.com/photo/scenic-view-of-snow-capped-mountains-during-night-3408744/",
//             "photographer": "stein egil liland",
//             "photographer_url": "https://www.pexels.com/@therato",
//             "photographer_id": 144244,
//             "avg_color": "#557088",
//             "src": {
//                 "original": "https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg",
//                 "large2x": "https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
//                 "large": "https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
//                 "medium": "https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&h=350",
//                 "small": "https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&h=130",
//                 "portrait": "https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
//                 "landscape": "https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
//                 "tiny": "https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280"
//             },
//             "liked": false,
//             "alt": "Scenic View Of Snow Capped Mountains During Night"
//         },
//         {
//             "id": 572897,
//             "width": 6914,
//             "height": 4463,
//             "url": "https://www.pexels.com/photo/mountain-covered-snow-under-star-572897/",
//             "photographer": "eberhard grossgasteiger",
//             "photographer_url": "https://www.pexels.com/@eberhardgross",
//             "photographer_id": 121938,
//             "avg_color": "#5D5A63",
//             "src": {
//                 "original": "https://images.pexels.com/photos/572897/pexels-photo-572897.jpeg",
//                 "large2x": "https://images.pexels.com/photos/572897/pexels-photo-572897.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
//                 "large": "https://images.pexels.com/photos/572897/pexels-photo-572897.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
//                 "medium": "https://images.pexels.com/photos/572897/pexels-photo-572897.jpeg?auto=compress&cs=tinysrgb&h=350",
//                 "small": "https://images.pexels.com/photos/572897/pexels-photo-572897.jpeg?auto=compress&cs=tinysrgb&h=130",
//                 "portrait": "https://images.pexels.com/photos/572897/pexels-photo-572897.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
//                 "landscape": "https://images.pexels.com/photos/572897/pexels-photo-572897.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
//                 "tiny": "https://images.pexels.com/photos/572897/pexels-photo-572897.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280"
//             },
//             "liked": false,
//             "alt": "Mountain Covered Snow Under Star"
//         }
//     ],
//     "total_results": 8000,
//     "next_page": "https://api.pexels.com/v1/search/?page=2&per_page=3&query=nature"
// }

//*************************************************************************************************************************************** */


// console.log that your server is up and running
app.listen(PORT, () => {
    console.log(`Hola, Server listening on ${PORT}`);
});