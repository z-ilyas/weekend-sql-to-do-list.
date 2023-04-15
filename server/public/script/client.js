console.log('client.js sourced');

$(document).ready( onReady );

function onReady() { 
console.log('DOM');
renderAndFetchAllTasks();
$('#addTasks-btn').on('click', addTask);

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
    $('#task-list').empty();
    for (task of responseGet){
        console.log(task)
        if (task.status === 'complete'){
            $('#task-list').append(`
            <tr data-id=${task.id}>
                <td>${task.tasks}</td>
                <td>${task.status}</td>
                <td></td>
                <td align="center"><button class="delete-btn">Delete</button></td>
            </tr>
            `)
        }
        else  if (task.status === 'pending') {
            $('#task-list').append(`
            <tr data-id=${task.id}>
                <td>${task.tasks}</td>
                <td>${task.status}</td>
                <td align="center"><button class="delete-btn">Complete</button></td>
                <td align="center"><button class="delete-btn">Delete</button></td>
            </tr>
            `)
        }
    }  
})
}

