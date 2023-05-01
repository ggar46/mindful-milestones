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

// GET request for IMAGE_TRACKER in the endpoint '/api/images'
app.get('/api/images', async (req, res) => {
    try {
        const { rows: image_tracker } = await db.query('SELECT * FROM image_tracker');
        res.send(image_tracker);
    } catch (e) {
        return res.status(400).json({ e });
    }
});


// GET request for TASK_TRACKER in the endpoint '/api/tasks'
app.get('/api/tasks', async (req, res) => {
    try {
        const { rows: task_tracker } = await db.query('SELECT * FROM task_tracker');
        res.send(task_tracker);
    } catch (e) {
        return res.status(400).json({ e });
    }
});

// GET request for GOAL_INFO in the endpoint '/api/goals'
app.get('/api/goals', async (req, res) => {
    try {
        const { rows: goal_info } = await db.query('SELECT * FROM goal_info');
        res.send(goal_info);
    } catch (e) {
        return res.status(400).json({ e });
    }
});

// GET request for USER_TABLE in the endpoint '/api/users'
app.get('/api/users', async (req, res) => {
    try {
        const { rows: user_table } = await db.query('SELECT * FROM user_table');
        res.send(user_table);
    } catch (e) {
        return res.status(400).json({ e });
    }
});

//*************************************************************************************************************************************** */

// DELETE request for IMAGE_TRACKER in the endpoint '/api/images'
app.delete('/api/images/:imageId', async (req, res) => {
    try {
        const imageId = req.params.imageId;
        await db.query('DELETE FROM image_tracker WHERE image_url=$1', [imageId]);
        console.log("From the delete request-url", imageId);
        res.status(200).end();
    } catch (e) {
        console.log(e);
        return res.status(400).json({ e });

    }
});

// DELETE request for TASK_TRACKER in the endpoint '/api/tasks'
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


// DELETE request for GOAL_INFO in the endpoint '/api/goals'
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

// PUT request for GOAL_INFO in the endpoint '/api/goals', no editing id/user
app.put('/api/goals/:goalId', async (req, res) =>{
    //console.log(req.params);
    //This will be the id that I want to find in the DB - the student to be updated
    const goalId = req.params.goalId
    const updatedGoal = { image_fkey: req.body.image_fkey, date: req.body.date, goal_purpose: req.body.goal_purpose, goal_obstacle: req.body.goal_obstacle, strategy: req.body.strategy, goal: req.body.goal}
    console.log("In the server from the url - the student id", studentId);
    console.log("In the server, from the react - the student to be edited", updatedStudent);
    // UPDATE students SET lastname = "something" WHERE id="16";
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

//*************************************************************************************************************************************** */

// POST request IMAGE_TRACKER
app.post('/api/images', async (req, res) => {
    try {
        const newStudent = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            iscurrent: req.body.iscurrent
        };
        //console.log([newStudent.firstname, newStudent.lastname, newStudent.iscurrent]);
        const result = await db.query(
            'INSERT INTO students(firstname, lastname, is_current) VALUES($1, $2, $3) RETURNING *',
            [newStudent.firstname, newStudent.lastname, newStudent.iscurrent],
        );
        console.log(result.rows[0]);
        res.json(result.rows[0]);

    } catch (e) {
        console.log(e);
        return res.status(400).json({ e });
    }

});

// POST request TASK_TRACKER

// POST request GOAL_INFO

// POST request USER_TABLE??? wait until auth0 we might get user from that, post names

//*************************************************************************************************************************************** */

// API GET request for PEXELS IMAGES in the endpoint '/api/pexels'

//*************************************************************************************************************************************** */




// create the POST request
app.post('/api/students', async (req, res) => {
    try {
        const newStudent = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            iscurrent: req.body.iscurrent
        };
        //console.log([newStudent.firstname, newStudent.lastname, newStudent.iscurrent]);
        const result = await db.query(
            'INSERT INTO students(firstname, lastname, is_current) VALUES($1, $2, $3) RETURNING *',
            [newStudent.firstname, newStudent.lastname, newStudent.iscurrent],
        );
        console.log(result.rows[0]);
        res.json(result.rows[0]);

    } catch (e) {
        console.log(e);
        return res.status(400).json({ e });
    }

});

// delete request for students
app.delete('/api/students/:studentId', async (req, res) => {
    try {
        const studentId = req.params.studentId;
        await db.query('DELETE FROM students WHERE id=$1', [studentId]);
        console.log("From the delete request-url", studentId);
        res.status(200).end();
    } catch (e) {
        console.log(e);
        return res.status(400).json({ e });

    }
});

//A put request - Update a student 
app.put('/api/students/:studentId', async (req, res) =>{
    //console.log(req.params);
    //This will be the id that I want to find in the DB - the student to be updated
    const studentId = req.params.studentId
    const updatedStudent = { id: req.body.id, firstname: req.body.firstname, lastname: req.body.lastname, iscurrent: req.body.is_current}
    console.log("In the server from the url - the student id", studentId);
    console.log("In the server, from the react - the student to be edited", updatedStudent);
    // UPDATE students SET lastname = "something" WHERE id="16";
    const query = `UPDATE students SET firstname=$1, lastname=$2, is_current=$3 WHERE id=${studentId} RETURNING *`;
    const values = [updatedStudent.firstname, updatedStudent.lastname, updatedStudent.iscurrent];
    try {
      const updated = await db.query(query, values);
      console.log(updated.rows[0]);
      res.send(updated.rows[0]);
  
    }catch(e){
      console.log(e);
      return res.status(400).json({e})
    }
  })

// console.log that your server is up and running
app.listen(PORT, () => {
    console.log(`Hola, Server listening on ${PORT}`);
});