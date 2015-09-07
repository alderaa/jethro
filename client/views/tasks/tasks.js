Template.edittask.helpers({
	task: function () {
		var taskId = FlowRouter.getParam("taskId"); 
		var task = Tasks.findOne({_id:taskId},{sort: {createdAt: -1}});
		return task;
	}
});

Template.edittask.events({
	"submit .edit-task": function (event) {
	  // Prevent default browser form submit
	  event.preventDefault();
	  var proj = 
	  {
	  	title : event.target.title.value,
	  	description : event.target.description.value,
	  	due_on : event.target.due_on.value,
	  	completed_on : event.target.completed_on.value,
	  	status : event.target.status.value,
	  	notes : event.target.notes.value,
	  };
	  var taskId = FlowRouter.getParam("taskId");
	  Meteor.call("updateTask", taskId, proj);
	}
});

Template.newtask.events({
	"submit .new-task": function (event) {
	  // Prevent default browser form submit
	  event.preventDefault();
	  var proj = 
	  {
	  	title : event.target.title.value,
	  	description : event.target.description.value,
	  	due_on : event.target.due_on.value,
	  	notes : event.target.notes.value,
	  	status : event.target.status.value,
	  	projectId  : FlowRouter.getParam("projectId")
	  };
	  Meteor.call("addTask", proj);
	}
});