var num = 0;
// Check if the tasks object exists within the local storage.
if (localStorage.getItem("tasks") === null) {
	var tasksObj = {"tasks":[]};
	// Creating an empty "tasks" object ^^.
} else {
	var tasksObj = localStorage.getItem("tasks");
	// If the tasks object does exist then collect it from the local storage of the browser.
	tasksObj = JSON.parse(tasksObj);
}

// On load it uses the tasksObj to change the innerHTML of the page to add table data and display the task in the table when the page is refreshed.
function dispObj (){
	for (x in tasksObj.tasks) {

		var t = timeSince(tasksObj.tasks[x]["timeCreated"]);

		document.getElementById("toDoList").innerHTML += "<tr id='"+ tasksObj.tasks[x]["taskId"] +"'><td>" + t + "</td><td>" + tasksObj.tasks[x]["taskName"] + "</td>"+  "<td><label class='container'><input type='checkbox' onclick='showDelete("+tasksObj.tasks[x]["taskId"]+")' class= 'checkBox' id='myCheck_"+ tasksObj.tasks[x]["taskId"] +"'> <span class='checkmark'></span> </label><button class='delete_btn' id='delete_"+ tasksObj.tasks[x]["taskId"] +"' onclick='deleteTask("+tasksObj.tasks[x]["taskId"]+")' style='visibility:hidden;'><i class='far fa-trash-alt'></i></button></td></tr>";
		num = tasksObj.tasks[x]["taskId"];

	}

// Changes the class of the body to the colour that's been stored in the local storage.
	document.getElementById("body").className = colorObj.color[0]["colorAdded"];

}

// Adds the time, task name and ID to the local storage when the submit button is clicked.
function addTaskToObj(t,i,n) {
	tasksObj.tasks.push({"timeCreated":t,"taskId":i, "taskName":n});
	localStorage.setItem("tasks",  JSON.stringify(tasksObj));
}


function addTask(){

	// If something is written into the input box then add the task, time and id to the table.
	if( document.myForm.task.value != "" ) {
		var taskToAdd = document.getElementsByName("task")[0].value;
		var t = timeSince(getTimeStamp());

	// Increasing the task id each time the function loops through and something is submitted. 
	num++;

	// Getting the current date+time
	getTimeStamp();

	// Changing the inner html of the page to add the tasks to the table.
	document.getElementById("toDoList").innerHTML += "<tr id='"+ num +"'><td>"+ timeSince(getTimeStamp()) +"</td><td>" + taskToAdd + "</td>" + "<td><label class='container'><input type='checkbox' id= 'myCheck_"+ num +"' onclick='showDelete("+num+")'><span class='checkmark'></span></label><button class='delete_btn' id='delete_"+ num +"' onclick='deleteTask("+num+")' style='visibility:hidden;'><i class='far fa-trash-alt'></i></button></td></tr>";
	
	// Clears the input box so when you submit the box is cleared for the next task.
	document.getElementsByName("task")[0].value = '';

	// Runs the addTaskToObj function and passes through the time added, the task id and the task name so store them in the local storage.
	addTaskToObj(getTimeStamp(),num,taskToAdd);

	}else{
	// If nothing is entered in the input an alert pops up.
	alert( "Please enter an item!" );

	}
	// To stop the page refreshing when the submit button is clicked.
	return false;
}

// Shows the delete button when the checkbox is checked.
function showDelete(num){
	if(document.getElementById('myCheck_'+ num).checked){
		document.getElementById('delete_'+ num).style.visibility = 'visible';
	}else {
		document.getElementById('delete_'+ num).style.visibility = 'hidden';
	}
}

// Deletes the line from the table when the delete button is clicked. Also deletes (splice) from the local storage.
function deleteTask(num){
  	document.getElementById(num).remove();
  	for (x in tasksObj.tasks){
  		if(tasksObj.tasks[x]["taskId"] === num){
  			tasksObj.tasks.splice(x, 1);
  			localStorage.setItem("tasks",  JSON.stringify(tasksObj));
  		}
  	}
}

// Gets the date + time from now and puts it into the below format.
function getTimeStamp() {
	var now = new Date();
	return ((now.getMonth() + 1) + '/' + (now.getDate()) + '/' + now.getFullYear() + " " + now.getHours() + ':'
	             + ((now.getMinutes() < 10) ? ("0" + now.getMinutes()) : (now.getMinutes())) + ':' + ((now.getSeconds() < 10) ? ("0" + now
	             .getSeconds()) : (now.getSeconds())));
}

// function setTime() {
// 	document.getElementById('timeTask').value = getTimeStamp();
// }
// Takes the time that the submit button was clicked away from the time now.
function timeSince(t){
	// console.log(t);
	const date1 = new Date(getTimeStamp());
	const date2 = new Date(t);
	const diffTime = Math.abs(date2 - date1);
	var diffMins = Math.ceil(diffTime / (60000)); 
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
	// console.log(diffTime + " milliseconds");
	// console.log(diffDays + " days");
	// console.log(diffMins + 'mins ago');
	
	if(diffMins>60){
		diffMins = Math.round(diffMins/60) + ' hours ago';
	}else{
		diffMins = diffMins + ' mins ago';

	}

	return diffMins;
}


						
// Passes the color from the onClick on the span through the function to change the class name of the body to change the background color.
function buttonClick(color){
	document.getElementById("body").className = color;

	// creating a new colour object to then add the new colour into
	var colorObj = {"color":[]};

	// Adds the color added to the class into the local storage.
	colorObj.color.push({"colorAdded":color});
	localStorage.setItem("color",  JSON.stringify(colorObj));
}

 
if (localStorage.getItem("color") === null) {
	var colorObj = {"color":[]};
	// Creating an empty "color" object ^^
} else {
	var colorObj = localStorage.getItem("color");
	// If the tasks object does exist then collect it from the local storage of the browser 
	colorObj = JSON.parse(colorObj);
	// After writing this check in the console that the colorObj exists by colorObj enter
}




