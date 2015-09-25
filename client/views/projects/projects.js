Template.project.helpers({
	project: function () {
		var projectId = FlowRouter.getParam("projectId"); 
		var project = Projects.findOne({_id:projectId});
		return project;
	},
	todo: function(){
		var projectId = FlowRouter.getParam("projectId");
		var tasks =  Tasks.find({projectId:projectId}, {$sort:{order_num: 1}}).fetch();
		for (t in tasks)
		{
			var assigned = Meteor.users.findOne({"_id":tasks[t].assigned_to});
			tasks[t].assigned_to = assigned.profile.firstname + " " + assigned.profile.lastname;
		}
		return tasks;
	},
	fields:[
		{'key':'order_num','label':'#'},
    	{'key':'title','label':'Title'},
    	{'key':'description','label':'Description'},
    	{'key':'assigned_to','label':'Assigned To'},
    	{'key':'due_on','label':'Due On'},
    	{'key':'completed_on','label':'Completed On'},
    	{'key':'_id','label':'Actions', 'tmpl':Template.taskActions}
    ],
    convs: function(){
    	var projectId = FlowRouter.getParam("projectId");
		var convs =  Convs.find({projectId:projectId}, {sort: {date: -1}});
		return convs;
    }
});

Template.projects.helpers({
	projects: function () {
      var tasks = [];
      var projects = Projects.find({"owner": Meteor.user()._id}, {sort: {createdAt: -1}}).fetch();
	  return projects;
	},
    fields:[
    	{'key':'title','label':'Title', tmpl:Template.editProjectLink},
    	{'key':'description','label':'Description'},
    	{'key':'due_on','label':'Due On', sortOrder: 0, sortDirection: 'ascending'},
    	{'key':'_id','label':'Mark Complete', 'tmpl':Template.Actions}
    ]
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
	},
	"click .done": function(){
      Meteor.call("markTaskDone",this._id);
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
	  toastr.success("'"+proj.title+"' has been saved", "Saved!");
	  //console.log(Template.addPost.__helpers.get('project').call())
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

var renderDate = function(){
	var nowTemp = new Date();
	var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);
	$('.datepicker').datepicker(
	{
		format: "mm/dd/yyyy",
		autoclose: true
	}
	);
};

Template.newproject.rendered = function(){
	renderDate();
};