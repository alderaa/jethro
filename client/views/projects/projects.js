/**************************************
Project Template
***************************************/
Template.project.onCreated(function(){
	this.subscribe('projects');
    this.subscribe('tasks');
});
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
			if(assigned)
				tasks[t].assigned_to = assigned.profile.firstname + " " + assigned.profile.lastname;
		}
		return tasks;
	},
	fields:[
		{'key':'order_num','label':'#'},
    	{'key':'title','label':'Title'},
    	{'key':'description','label':'Description'},
    	{'key':'assigned_to','label':'Assigned To'},
    	{'key':'due_on','label':'Due On','tmpl':Template.dueon},
    	{'key':'completed_on','label':'Completed On','tmpl':Template.completedon},
    	{'key':'_id','label':'Actions', 'tmpl':Template.taskActions}
    ],
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

/**************************************
Projects Template
***************************************/
Template.projects.onCreated(function(){
	 this.subscribe('projects');
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
    	{'key':'due_on','label':'Due On', sortOrder: 0, sortDirection: 'ascending',"tmpl":Template.dueon},
    	{'key':'notes','label':'Notes'}
    ]
});
/**************************************
Edit Project Template
***************************************/
Template.editproject.onCreated(function(){
	 this.subscribe('projects');
});

Template.editproject.helpers({
	project: function () {
		var projectId = FlowRouter.getParam("projectId"); 
		var project = Projects.findOne({_id:projectId});
		return project;
	}
});

var projHooks = {
  before: {
    insert: function(doc) {
      if(Meteor.userId()){
        doc.owner = Meteor.userId();
        return doc;
      }
    }
  },
  after: {
    // Replace `formType` with the form `type` attribute to which this hook applies
    insert: function(error, result) {
    	if(!error)
    	{
    		FlowRouter.go("/project/"+this.currentDoc._id);
    		Materialize.toast('Added project!', 3000, 'green');
    	}
    },
    update: function(error, result) {
    	if(!error)
    	{
    		FlowRouter.go("/project/"+this.currentDoc._id);
    		Materialize.toast('Updated project!', 3000, 'green');
    	}
    },
  },
};
AutoForm.addHooks(['insertProject','updateProject'], projHooks);