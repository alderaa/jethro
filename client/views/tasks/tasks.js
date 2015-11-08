Template.edittask.helpers({
	task: function () {
		var taskId = FlowRouter.getParam("taskId"); 
		var task = Tasks.findOne({_id:taskId});
		return task;
	}
});
UI.registerHelper('checkedIf', function(val) {
  return val ? 'checked' : '';
});

Template.edittask.onCreated(function(){
    this.subscribe('tasks');
    this.subscribe('projects');
});
Template.edittask.onRendered(function() {
	console.log($('select').material_select);
    setTimeout(function(){
    	$('select').material_select();
    }, 5000);
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
	},
	"click .not-done": function(){
      Meteor.call("markTaskNotDone",FlowRouter.getParam("taskId"));
   } 
});

Template.newtask.helpers({
	project: function () {
		var pid = FlowRouter.getParam("projectId"); 
		var project = Projects.findOne({_id:pid});
		return project;
	},
	taskDefault: function(){
		return {projectId:FlowRouter.getParam("projectId")}
	}
});

Template.newtask.onCreated(function(){
	this.subscribe('projects');
    this.subscribe('tasks');
});
Template.newtask.events({
	"click .back": function (event) {
		FlowRouter.go("/project/"+FlowRouter.getParam("projectId"));
	}
});

var taskHooks = {
  after: {
    // Replace `formType` with the form `type` attribute to which this hook applies
    insert: function(error, result) {
    	if(!error)
    	{
    		FlowRouter.go("/project/"+this.currentDoc.projectId);
    		Materialize.toast('Added Task!', 3000, 'green')
    	}
    },
    update: function(error, result) {
    	if(!error)
    	{
    		FlowRouter.go("/project/"+this.currentDoc.projectId);
    		Materialize.toast('Updated Task!', 3000, 'green')
    	}
    },
  },
};
AutoForm.addHooks(['insertTask','updateTask'], taskHooks);