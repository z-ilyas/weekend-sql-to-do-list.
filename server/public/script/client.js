console.log('client.js sourced');

$(document).ready( onReady );

function onReady() { 
console.log('DOM');
renderAndFetchAllTasks();
$('#addTasks-btn').on('click', addTask);
$('#task-list').on('click', '.complete-btn', completeTask);
$('#task-list').on('click', '.delete-btn', deleteTask);
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
            <tr class="task-done" data-id=${task.id}>
                <td>${task.tasks}</td>
                <td>${task.status}</td>
                <td></td>
                <td align="center"><button class="delete-btn">Delete</button></td>
            </tr>
            `)
        }
        else  if (task.status === 'pending') {
            $('#task-list').append(`
            <tr class="task-not-done" data-id=${task.id}>
                <td>${task.tasks}</td>
                <td>${task.status}</td>
                <td align="center"><button class="complete-btn">Complete</button></td>
                <td align="center"><button class="delete-btn">Delete</button></td>
            </tr>
            `)
        }
    }  
})
}
function completeTask() {
let idToUpdate = $(this).parent().parent().data('id');
console.log('this should show the ids when complete button is clicked', idToUpdate);
$.ajax({
    method: 'PUT',
    url: `/tasks/${idToUpdate}`,
    data: {
      status: 'complete'
    }
    }).then(function(response) {
        renderAndFetchAllTasks();
    }).catch(function(error) {
        console.log('uh oh. updateToDigidog fail:', error);
    })
}

function deleteTask() {
let idToDelete = $(this).parent().parent().data('id');

$.ajax({
      method: 'DELETE',
      url: `/tasks/${idToDelete}`
    }).then(function(response) {
        renderAndFetchAllTasks();
    }).catch(function(error) {
        alert('something broke');
    });
  }

