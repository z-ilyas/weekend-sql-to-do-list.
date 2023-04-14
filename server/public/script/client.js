console.log('client.js sourced');

$(document).ready( onReady );

function onReady() { 
console.log('DOM');
$('#addTask-btn').on('click', addTask);

}

