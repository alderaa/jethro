Template.taskBody.onRendered(function(){
   $(".collapsible").collapsible();
});

Template.edittask.helpers({
	task: function () {
		var taskId = FlowRouter.getParam("taskId"); 
		var task = Tasks.findOne({_id:taskId});
		return task;
	}
});

Template.edittask.onCreated(function(){
    this.subscribe('tasks');
    this.subscribe('projects');
});
Template.edittask.onRendered(function() {
   $('select').material_select();
});
Template.edittask.events({
	"click .not-done": function(){
      Meteor.call("markTaskNotDone",FlowRouter.getParam("taskId"));
    },
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

Template.newissue.onCreated(function(){
   this.subscribe('tasks'); 
});
Template.editissue.onCreated(function(){
   this.subscribe('tasks'); 
});

Template.editissue.events({
	"click .not-done": function(){
      Meteor.call("markTaskNotDone",FlowRouter.getParam("taskId"));
    },
});

Template.editissue.helpers({
	'issue': function () {
		var taskId = FlowRouter.getParam("taskId"); 
		var task = Tasks.findOne({_id:taskId});
		return task;
	}
});

Template.issues.onCreated(function(){
    this.subscribe("tasks");
})

Template.issues.helpers({
    'issues': function(){
        var issues = Tasks.find({"assigned_to":Meteor.userId(),"isIssue":true, 'completed_on':{$exists:false}},{sort:{due_on:-1}}).fetch();
        for(var i in issues){
            if(issues[i].assigned_to != undefined)
            {
                var assgn =  Meteor.users.findOne({_id:issues[i].assigned_to}).profile;
                if(Meteor.userId() == issues[i].assigned_to){
                    issues[i].canEdit = true;
                }
                issues[i].assigned_to = assgn.firstname+" "+assgn.lastname;
            }
        }  
        return issues;
    }
})
var taskHooks = {
  before: {
    insert: function(doc) {
        doc.projectId = FlowRouter.getParam("projectId");
        var proj = Projects.findOne({'_id':doc.projectId});
        doc.projectTitle = proj.title;
    	return doc;
    }
  },
  after: {
    // Replace `formType` with the form `type` attribute to which this hook applies
    insert: function(error, result) {
    	if(!error)
    	{
    		FlowRouter.go("/project/"+FlowRouter.getParam("projectId"));
    		Materialize.toast('Added Task!', 3000, 'green');
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
var issueHooks = {
    before: {
        insert: function(doc){      
            doc.projectId = 0;
            doc.projectTitle = "Don't Forget Me Issue";
            doc.assigned_by = Meteor.userId();
            return doc;
        }
    },
    after:{
        insert: function(error, result){
            FlowRouter.go("/");
    		Materialize.toast('Added Issue!', 3000, 'green');
        },
        update: function(error, result){
            FlowRouter.go("/");
    		Materialize.toast('Updated Issue!', 3000, 'green');
        }
    }
}
AutoForm.addHooks(['insertTask','updateTask'], taskHooks);
AutoForm.addHooks(['insertIssue','updateIssue'], issueHooks);