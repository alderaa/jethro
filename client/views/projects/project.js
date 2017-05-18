/**************************************
Project Template
***************************************/
Template.project.onCreated(function () {
	this.subscribe('projects');
});
function taskCursor() {
	var projectId = FlowRouter.getParam("projectId");
	var tasks = Tasks.find({ projectId: projectId }, { sort: { order_num: 1 } }).fetch();
	for (t in tasks) {
		var assigned = Meteor.users.findOne({ "_id": tasks[t].assigned_to });
		if (assigned)
			tasks[t].assigned_to = assigned.profile.firstname + " " + assigned.profile.lastname;
	}
	return tasks;
}

Template.project.onRendered(function () {
	$(".conv-col").height($(".main").height());
});
Template.project.helpers({
	project: function () {
		var projectId = FlowRouter.getParam("projectId");
		var project = Projects.findOne({ _id: projectId });
		return project;
	},
	todo: taskCursor
});
Template.project.events({
	"submit .add-conv": function (event) {
		event.preventDefault();
		var conv = {
			text: event.target.text.value,
			projectId: FlowRouter.getParam("projectId")
		};
		event.target.text.value = "";
		Meteor.call("addConv", conv);
	},
	"click .done": function () {
		Meteor.call("markTaskDone", this._id, this.title, this.projectId);
		document.getElementById(this._id).click();
	}
});

Template.projectBody.onRendered(function () {
	$(".collapsible").collapsible();
});