Template.project.helpers({
	project: function () {
		var projectId = FlowRouter.getParam("projectId"); 
		var project = Projects.findOne({_id:projectId});
		return project;
	},
	not_started: function(){
		var projectId = FlowRouter.getParam("projectId");
		var tasks =  Tasks.find({projectId:projectId,status:"not_started"});
		return tasks;
	},
	in_progress: function(){
		var projectId = FlowRouter.getParam("projectId");
		var tasks =  Tasks.find({projectId:projectId,status:"in_progress"});
		return tasks;
	},
	finished: function(){
		var projectId = FlowRouter.getParam("projectId");
		var tasks =  Tasks.find({projectId:projectId,status:"completed"});
		return tasks;
	},
	fields:[
    	{'key':'title','label':'Title'},
    	{'key':'description','label':'Description'},
    	{'key':'created_on','label':'Created On'},
    	{'key':'due_on','label':'Due On', sortOrder: 0, sortDirection: 'ascending'},
    	{'key':'_id','label':'Actions', 'tmpl':Template.taskActions}
    ],
    convs: function(){
    	var projectId = FlowRouter.getParam("projectId");
		var convs =  Convs.find({projectId:projectId}, {sort: {date: -1}});
		return convs;
    }
});

Template.project.events({
	"submit .add-conv" : function(event){
		event.preventDefault();
		var conv = {
			text: event.target.text.value,
			projectId : FlowRouter.getParam("projectId")
		};
		event.target.text.value = "";
		Meteor.call("addConv", conv);
	}
});

Template.editproject.helpers({
	project: function () {
		var projectId = FlowRouter.getParam("projectId"); 
		var project = Projects.findOne({_id:projectId});
		return project;
	}
});

Template.editproject.events({
	"submit .edit-project": function (event) {
	  // Prevent default browser form submit
	  event.preventDefault();
	  var proj = 
	  {
	  	title : event.target.title.value,
	  	description : event.target.description.value,
	  	status : event.target.status.value,
	  	due_on : event.target.due_on.value,
	  	notes : event.target.notes.value
	  };
	  var projectId = FlowRouter.getParam("projectId");
	  Meteor.call("updateProject", projectId, proj);
	}
});

Template.newproject.events({
	"submit .new-project": function (event) {
	  // Prevent default browser form submit
	  event.preventDefault();
	  var proj = 
	  {
	  	title : event.target.title.value,
	  	description : event.target.description.value,
	  	status : event.target.status.value,
	  	due_on : event.target.due_on.value,
	  	notes : event.target.notes.value
	  };
	  Meteor.call("addProject", proj);
	}
});