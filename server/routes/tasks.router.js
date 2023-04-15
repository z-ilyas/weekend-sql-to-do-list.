const express = require('express');
const tasksRouter = express.Router();

const pool = require('../modules/pool.js');

module.exports = tasksRouter;

tasksRouter.post('/', (req, res) => {
    console.log('POST /tasks');
    console.log('here is the data we got mailed:', req.body);

    let newTask = req.body.task;
    let newStatus = req.body.status;

    let sqlText = `
      INSERT INTO "to-do-list"
      ("tasks", "status")
      VALUES
      ($1, $2);
      `;
    let sqlValues = [newTask, newStatus]
    pool.query(sqlText, sqlValues)
    .then((dbRes) => {
      console.log('New task was added!')
      res.sendStatus(201);
    })
    .catch((dbErr) => {
      console.log('POST /tasks error:', dbErr);
      res.sendStatus(500);
    })
})

tasksRouter.get('/', (req, res) =>{
    console.log('GET /tasks');

    let sqlText = 'SELECT * FROM "to-do-list";';

    pool.query(sqlText)
    .then((dbRes) => {
      console.log('here is the data we are sending', dbRes.rows);
      let allTasks = dbRes.rows;
      res.send(allTasks)
    })
    .catch((dbErr) => {
      console.log('SQL query in GET /tasks failed:', dbErr)
      res.sendStatus(500);
    })
})