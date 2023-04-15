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

tasksRouter.put('/:id', (req, res) => {

let theIdToUpdate = req.params.id;
console.log('here is our id', req.params.id);
let newstatus = req.body.status;
console.log('This should always be complete', req.body.status);
let sqlText = `
    UPDATE "to-do-list"
    SET "status"=$1
    WHERE "id"=$2;
    `
let sqlValues = [newstatus, theIdToUpdate];
  
pool.query(sqlText, sqlValues)
    .then((dbRes) => {
    res.sendStatus(200);
    })
    .catch((dbErr) => {
    console.log('PUT /tasks/:id fail:', dbErr);
    res.sendStatus(500);
      })
})

tasksRouter.delete('/:id', (req, res) => {
console.log('here is our id', req.params.id);
let theIdToDelete = req.params.id;

let sqlText = `
    DELETE FROM "to-do-list"
    WHERE "id"=$1;
    `
let sqlValues = [theIdToDelete]
  
pool.query(sqlText, sqlValues)
    .then((dbRes) => {
    res.sendStatus(200); 
    })
    .catch((dbErr) => {
    console.log('delete /tasks error:', dbErr);
    res.sendStatus(500);
    })
})