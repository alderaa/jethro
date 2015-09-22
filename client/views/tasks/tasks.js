Template.edittask.helpers({
	task: function () {
		var taskId = FlowRouter.getParam("taskId"); 
		var task = Tasks.findOne({_id:taskId},{sort: {createdAt: -1}});
		return task;
	}
});
UI.registerHelper('checkedIf', function(val) {
  return val ? 'checked' : '';
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
	  	assigned_to : event.target.assigned_to.value,
	  	order_num : event.target.order_num.value,
	  	notes : event.target.notes.value
	  };
	  var taskId = FlowRouter.getParam("taskId");
	  var projectId = Template.edittask.__helpers.get('task').call().projectId;
	  FlowRouter.go("/project/"+projectId);
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
	  	completed_on : event.target.completed_on.value,
	  	assigned_to : event.target.assigned_to.value,
	  	order_num : event.target.order_num.value,
	  	notes : event.target.notes.value,
	  	projectId: FlowRouter.getParam("projectId")
	  };
	  Meteor.call("addTask", proj);
	},
	"click .back": function (event) {
		FlowRouter.go("/project/"+FlowRouter.getParam("projectId"));
	}
});