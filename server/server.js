const express = require('express');
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const db = require('./db/db-connection.js');
const mockdata = require("./mockdata.js");
const {createClient} = require('pexels');
const fetch = require('node-fetch');
const REACT_BUILD_DIR = path.join(__dirname, "..", "client", "dist");



const app = express();
const PORT = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());
app.use(express.static(REACT_BUILD_DIR));

//*************************************************************************************************************************************** */



//MOCK DATA - GET REQUEST
app.get("/api/pexels", (req, res) => {
    console.log(mockdata);
      res.json(mockdata);
  });

  
//API GET request for PEXELS IMAGES in the endpoint '/api/pexels'
// app.get('/api/pexels/:searchedbyuser', async (req, res) => {
//     try {
//       console.log('code reached here');
//       const client = createClient(process.env.API_KEY);
//       const searchedbyuser = req.params.searchedbyuser;
//       const url = `https://api.pexels.com/v1/search?query=${searchedbyuser}&per_page=3`;
//       const data = await fetch(url, {
//         headers: {
//           Authorization: process.env.API_KEY,
//         },
//       });
//       const searchresults = await data.json();
//       res.json(searchresults);
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ message: 'Server Error' });
//     }
//   });
 
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
app.get('/api/tasks/:taskId', async (req, res) => {
    try {
        const taskGoalId = req.params.taskId
        const { rows: task_tracker } = await db.query('SELECT * FROM task_tracker WHERE goal_fkey=$1', [taskGoalId]);
        res.send(task_tracker);
        res.status(200).end();
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
    const updatedGoal = {image_fkey: req.body.image_fkey, date: req.body.date, goal_purpose: req.body.goal_purpose, goal_obstacle: req.body.goal_obstacle, strategy: req.body.strategy, goal: req.body.goal}
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

// PUT request for TASKS in the endpoint '/api/tasks', no editing id/user (works)
app.put('/api/tasks/:taskId', async (req, res) =>{
    //console.log(req.params);
    //This will be the id that I want to find in the DB - the goal to be updated
    const taskId = req.params.taskId
    const updatedTask = {goal_fkey: req.body.goal_fkey, task_text: req.body.task_text, is_checked: req.body.is_checked}
    const query = `UPDATE task_tracker SET goal_fkey=$1, task_text=$2, is_checked=$3 WHERE id=${taskId} RETURNING *`;
    const values = [updatedTask.goal_fkey, updatedTask.task_text, updatedTask.is_checked];
    try {
      const updated = await db.query(query, values);
      console.log(updated.rows[0]);
      res.send(updated.rows[0]);
  
    }catch(e){
      console.log(e);
      return res.status(400).json({e})
    }
  })

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
            is_checked: req.body.is_checked
        };
        const result = await db.query(
            'INSERT INTO task_tracker(goal_fkey, task_text, is_checked) VALUES($1, $2, $3) RETURNING *',
            [newTask.goal_fkey, newTask.task_text, newTask.is_checked],
        );
        console.log(result.rows[0]);
        res.json(result.rows[0]);

    } catch (e) {
        console.log(e);
        console.log("did not post")
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

//*************************************************************************************************************************************** */

// creates an endpoint for the route "/""
app.get('/*', (req, res) => {
    console.log("/* is executing")
    res.sendFile(path.join(REACT_BUILD_DIR, 
        'index.html'))
});

// console.log that your server is up and running
app.listen(PORT, () => {
    console.log(`Hola, Server listening on ${PORT}`);
});