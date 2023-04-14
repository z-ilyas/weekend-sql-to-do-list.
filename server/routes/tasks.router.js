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
      console.log('POST /task error:', dbErr);
      res.sendStatus(500);
    })
})