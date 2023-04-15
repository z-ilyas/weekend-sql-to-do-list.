console.log('client.js sourced');

$(document).ready( onReady );

function onReady() { 
console.log('DOM');
$('#addTasks-btn').on('click', addTask);
renderAndFetchAllTasks();

}

function addTask() {
    let tasks = { 
      task: $('#tasks-input').val(),
      status: $('#status-input').val()
    }
$.ajax({
    method: 'POST',
    url: '/tasks',
    data: tasks
  }).then(function(responsePost) {
    console.log(responsePost);
    renderAndFetchAllTasks();
  })
}

function renderAndFetchAllTasks(){

$.ajax({
    method: 'GET',
    url: '/tasks',
}).then(function(responseGet) {
    console.log('Here is the data we are receiving', responseGet);

})
}

